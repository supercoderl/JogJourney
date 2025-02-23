import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";

const useStepCounter = () => {
    const [pedometerAvailability, setPedometerAvailability] = useState<string>("");
    const [stepCount, setStepCount] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    let subscription: any = null;

    const subscribe = async () => {
        try {
            const isAvailable = await Pedometer.isAvailableAsync();
            setPedometerAvailability(String(isAvailable));

            if (isAvailable && isRunning) {
                subscription = Pedometer.watchStepCount((result) => {
                    setStepCount((prevSteps) => prevSteps + result.steps);
                });

                setStartTime((prevStartTime) => prevStartTime ?? Date.now());
            }
        } catch (error) {
            setPedometerAvailability("Error checking availability");
        }
    };

    const startTracking = () => {
        setIsRunning(true);
        setStartTime(Date.now() - elapsedTime);
    };

    const pauseTracking = () => {
        setIsRunning(false);
        setElapsedTime(Date.now() - (startTime ?? 0));
    };

    const stopTracking = () => {
        setIsRunning(false);
        setStepCount(0);
        setElapsedTime(0);
        setStartTime(null);
    };

    useEffect(() => {
        if (isRunning) {
            subscribe();
        } else if (subscription) {
            subscription.remove();
            subscription = null;
        }

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [isRunning]);

    const distanceCovered = (stepCount / 1300).toFixed(1);
    const caloriesBurnt = (parseFloat(distanceCovered) * 60).toFixed(0);
    const formattedTime = (elapsedTime / 60000).toFixed(1); // Hiển thị số phút
    let averageSpeed = "0.0";
    if (startTime) {
        const timeElapsed = (Date.now() - startTime) / (1000 * 60 * 60); // Chuyển ms → giờ
        if (timeElapsed > 0) {
            averageSpeed = (parseFloat(distanceCovered) / timeElapsed).toFixed(1); // km/h
        }
    }

    return {
        pedometerAvailability,
        stepCount,
        distanceCovered,
        caloriesBurnt,
        formattedTime,
        isRunning,
        averageSpeed,
        startTracking,
        pauseTracking,
        stopTracking
    };
};

export default useStepCounter;