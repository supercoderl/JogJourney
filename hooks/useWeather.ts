import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_WEATHER_KEY;

const useWeather = () => {
    const [weather, setWeather] = useState<any>(null);
    const [district, setDistrict] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Quyền truy cập vị trí bị từ chối");
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let { latitude, longitude } = location.coords;

            await getWeather(latitude, longitude);
            await getDistrict(latitude, longitude);
        } catch (err) {
            setError("Lỗi khi lấy thông tin vị trí");
        } finally {
            setLoading(false);
        }
    };

    const getWeather = async (latitude: number, longitude: number) => {
        try {
            const res = await axios.get(
                `https://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=${API_KEY}`
            );
            setWeather(res.data);
        } catch (err) {
            setError("Lỗi khi lấy thông tin thời tiết");
        }
    };

    const getDistrict = async (latitude: number, longitude: number) => {
        try {
            let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

            if (geocode.length > 0) {
                let districtName = geocode[0].subregion || geocode[0].city;
                setDistrict(districtName ?? '');
            } else {
                setDistrict("Không tìm thấy huyện");
            }
        } catch (err) {
            setError("Lỗi khi lấy thông tin huyện/quận");
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return { weather, district, loading, error, refresh: fetchWeather };
};

export default useWeather;
