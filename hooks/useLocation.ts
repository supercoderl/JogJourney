import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useAuth } from "@/providers";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [locations, setLocations] = useState<Location.LocationObjectCoords[]>([]);
  const { userInformation } = useAuth();
  const [distance, setDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // Thời gian đã trôi qua (giây)
  const [speed, setSpeed] = useState(0); // Vận tốc (m/s)
  const [caloriesBurned, setCaloriesBurned] = useState(0); // Calo thâm hụt
  const [watchId, setWatchId] = useState<Location.LocationSubscription | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Bộ đếm thời gian
  const [maxSpeed, setMaxSpeed] = useState(0);

  const getDistance = (coord1: Location.LocationObjectCoords, coord2: Location.LocationObjectCoords) => {
    const R = 6371e3; // Bán kính Trái đất (mét)
    const lat1 = (coord1.latitude * Math.PI) / 180;
    const lat2 = (coord2.latitude * Math.PI) / 180;
    const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const deltaLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Khoảng cách (mét)
  };

  const startTracking = async () => {
    // Bắt đầu đếm thời gian mỗi giây
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    setTimer(interval);

    const id = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 500,
        distanceInterval: 0.1, // Bỏ qua khoảng cách <1m
      },
      (newLocation) => {
        if (isPaused) return;

        setLocation(newLocation.coords);
        setLocations((prev) => {
          if (prev.length > 0) {
            const lastLocation = prev[prev.length - 1];

            if (lastLocation && newLocation?.coords) {
              const dist = getDistance(
                {
                  latitude: lastLocation.latitude, longitude: lastLocation.longitude,
                  altitude: null,
                  accuracy: null,
                  altitudeAccuracy: null,
                  heading: null,
                  speed: null
                },
                {
                  latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude,
                  altitude: null,
                  accuracy: null,
                  altitudeAccuracy: null,
                  heading: null,
                  speed: null
                }
              );

              console.log(dist);

              if (dist >= 1) {
                setDistance((d) => d + dist);
              }
            }
          }
          return [...prev, newLocation.coords];
        });
      }
    );

    setWatchId(id);
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (watchId) {
      watchId.remove();
      setWatchId(null);
    }
    if (timer) {
      clearInterval(timer); // Dừng bộ đếm thời gian
      setTimer(null);
    }

    setIsTracking(false);
    setElapsedTime(0); // Reset thời gian
    setDistance(0); // Reset quãng đường
    setSpeed(0); // Reset vận tốc
    setCaloriesBurned(0); // Reset calo
    setLocations([]); // Reset danh sách location
    setIsPaused(false); // Reset trạng thái pause
    setMaxSpeed(0);
  };

  const pauseTracking = () => {
    console.log("Paused");
    setIsPaused(true);

    if (watchId) {
      watchId.remove();
      setWatchId(null);
    }

    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const resumeTracking = async () => {
    setIsPaused(false);

    if (!timer) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setTimer(interval);
    }

    const id = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 500,
        distanceInterval: 0.1,
      },
      (newLocation) => {
        setLocation(newLocation.coords);
        setLocations((prev) => {
          if (prev.length > 0) {
            const lastLocation = prev[prev.length - 1];
            const dist = getDistance(lastLocation, newLocation.coords);
            if (dist >= 1) {
              setDistance((d) => d + dist);
            }
          }
          return [...prev, newLocation.coords];
        });
      }
    );

    setWatchId(id);
  };

  useEffect(() => {
    if (elapsedTime > 0) {
      const speed = distance / elapsedTime;
      if (speed > maxSpeed) setMaxSpeed(speed);
      setSpeed(speed); // m/s
    }

    const weight = userInformation.weight;
    let caloriesPerKm = 0;
    if (weight < 60) caloriesPerKm = 43;
    else if (weight >= 60 && weight < 70) caloriesPerKm = 50;
    else if (weight >= 70 && weight < 80) caloriesPerKm = 58;
    else caloriesPerKm = 63;

    setCaloriesBurned((distance / 1000) * caloriesPerKm);
  }, [distance, elapsedTime]);

  useEffect(() => {
    let isMounted = true; // Để tránh rò rỉ bộ nhớ khi unmount

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      if (isMounted) {
        setLocation(currentLocation.coords);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    location,
    distance,
    elapsedTime,
    speed,
    maxSpeed,
    startTracking,
    stopTracking,
    isTracking,
    caloriesBurned,
    pauseTracking,
    resumeTracking,
    isPaused
  };
};

export default useCurrentLocation;