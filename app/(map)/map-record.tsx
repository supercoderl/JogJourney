import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import Horizontal from "@/components/Horizontal";
import useCurrentLocation from "@/hooks/useLocation";
import useWeather from "@/hooks/useWeather";
import { useAuth } from "@/providers";
import MapDetail from "@/screens/HomeScreen/map/map-detail";
import RecordMap from "@/screens/HomeScreen/map/record";
import { toast } from "@/utils";
import screen from "@/utils/screen";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Animated, Modal } from "react-native";
import MapView, { Polyline } from "react-native-maps";

export default function MapRecordScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [showModal, setShowModal] = useState(false);
    const [level, setLevel] = useState<any>(null);
    const [exercise, setExercise] = useState<any>(null);
    const [map, setMap] = useState<any>(null);

    const hasStartedTracking = useRef(false);

    const { weather, loading } = useWeather();
    const {
        location,
        distance,
        startTracking,
        stopTracking,
        speed,
        caloriesBurned,
        pauseTracking,
        resumeTracking,
        isPaused,
        elapsedTime,
        maxSpeed,
        isTracking
    } = useCurrentLocation();
    const { userInformation } = useAuth();

    const params = useLocalSearchParams();

    const giaDinhParkBoundary = [
        { latitude: 10.8141439, longitude: 106.6748091 },
        { latitude: 10.813477, longitude: 106.677092 },
        { latitude: 10.812223, longitude: 106.676702 },
        { latitude: 10.811100, longitude: 106.675901 },
        { latitude: 10.809804, longitude: 106.674102 },
        { latitude: 10.810674, longitude: 106.672821 },
        { latitude: 10.812300, longitude: 106.672214 },
        { latitude: 10.8141439, longitude: 106.6748091 }
    ];

    useEffect(() => {
        if (params) {
            if (!params.map) {
                toast.error('Lỗi tham số', 'Vui lòng kiểm tra lại tham số truyền vào');
                router.replace('/(home)/activity');
                return;
            }

            if (typeof params.map === 'string') {
                try {
                    const parsedMap = JSON.parse(params.map);
                    setMap((prev: any) => (JSON.stringify(prev) !== JSON.stringify(parsedMap) ? parsedMap : prev));
                } catch (error) {
                    console.error('Lỗi khi parse map:', error);
                }
            }
        }
    }, [params]);

    useEffect(() => {
        if (params?.level && params?.exercise && typeof params.level === 'string' && typeof params.exercise === 'string') {
            try {
                const parsedLevel = JSON.parse(params.level);
                const parsedExercise = JSON.parse(params.exercise);

                setLevel((prev: any) => (JSON.stringify(prev) !== JSON.stringify(parsedLevel) ? parsedLevel : prev));
                setExercise((prev: any) => (JSON.stringify(prev) !== JSON.stringify(parsedExercise) ? parsedExercise : prev));

                // Chỉ gọi startTracking nếu chưa gọi trước đó
                if (!hasStartedTracking.current) {
                    startTracking();
                    hasStartedTracking.current = true; // Đánh dấu đã gọi
                }
            } catch (error) {
                console.error('Lỗi khi parse level hoặc exercise:', error);
            }
        }
    }, [params?.level, params?.exercise]);

    useEffect(() => {
        if (level && map && exercise && Number(distance.toFixed(0)) >= map?.distance) {
            toast.success("Chúc mừng", "Bạn đã hoàn thành thử thách");
            stopTracking();
            router.replace({
                pathname: '/(map)/detail',
                params: {
                    type: "record",
                    result: JSON.stringify({
                        elapsedTime,
                        distance,
                        caloriesBurned,
                        speed,
                        maxSpeed,
                        level: level,
                        exerciseId: exercise?.index
                    }),
                    map: JSON.stringify(map)
                }
            });
        }
    }, [distance, level, map, exercise]);

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.replace('/(home)')}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                rightIcon={
                    <TouchableOpacity onPress={() => router.push('/(map)/weather-check')}>
                        <Image source={assets.image.cloudy} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
            />

            <View style={{ flex: 1 }}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: 10.811877,
                            longitude: 106.674593,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.009,
                        }}
                    >
                        <Polyline
                            coordinates={giaDinhParkBoundary}
                            strokeWidth={4} // Độ dày đường
                            strokeColor="blue" // Màu xanh
                        />
                    </MapView>
                </View>

                {/* ScrollView chứa nội dung cuộn */}
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    contentContainerStyle={{ paddingTop: 300, position: 'absolute', top: -50 }} // Đẩy nội dung xuống dưới map
                    style={{ position: 'relative' }}
                >
                    {/* recordBg phải là absolute */}
                    <Animated.Image
                        source={assets.image.recordBg}
                        style={[
                            styles.recordBg,
                        ]}
                    />

                    {/* Các item sẽ cuộn lên theo */}
                    <Animated.View style={[styles.item, { top: screen.width / 1.13 }]}>
                        <Image source={assets.image.item} style={{ width: '100%', height: '100%' }} />
                    </Animated.View>
                    <Animated.View style={[styles.item, { top: screen.width / 1.08 }]}>
                        <Image source={assets.image.item} style={{ width: '100%', height: '100%' }} />
                    </Animated.View>

                    {/* Nội dung cuộn */}
                    <RecordMap
                        map={map}
                        handleShowModal={setShowModal}
                        isTracking={isTracking}
                        border={
                            <View style={styles.border}>
                                <View style={styles.innerBorder}>
                                    <Text style={{ fontFamily: 'Jomhuria', fontSize: 128, marginBottom: -30 }}>{(distance / 1000).toFixed(3)}</Text>
                                    <Text style={{ fontFamily: 'Jomhuria', fontSize: 64, marginTop: -50, marginBottom: 30, color: '#19A1CB' }}>KM</Text>
                                </View>
                            </View>
                        }
                        handlePause={() => {
                            if (isPaused) {
                                toast.info("Tiếp tục", "Hệ thống đang tiếp tục tính toán.");
                                resumeTracking();
                            }
                            else {
                                toast.info("Dừng lại", "Hệ thống đã dừng tính toán.");
                                pauseTracking();
                            }
                        }}
                    />

                    <MapDetail
                        map={map}
                        recordInfo={{
                            stepCount: 300,
                            distanceCovered: (distance / 1000).toFixed(3),
                            caloriesBurnt: caloriesBurned.toFixed(1),
                            averageSpeed: (speed * 3.6).toFixed(2),
                            formattedTime: elapsedTime,
                            weather,
                            level
                        }}
                        loading={loading}
                    />

                    <Horizontal height={20} color="rgb(240, 238, 238)" styles={{ zIndex: 6 }} />

                    <View style={styles.submitView}>
                        <TouchableOpacity style={styles.submitButton} onPress={() => {
                            if (!userInformation?.type || userInformation?.type === 'free') {
                                toast.error("Không được", "Bạn phải đăng ký gói Pro để vào thử thách");
                                return;
                            }
                            router.push({ pathname: '/(map)/challenge', params: map })
                        }}>
                            <Text style={styles.submitText}>Thử thách</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.ScrollView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.center}>
                    <View style={{ backgroundColor: '#19A1CB', paddingBlock: 30, width: '100%', alignItems: 'center' }}>
                        <Text style={styles.modalTitle}>Đồng ý dừng ? {map?.distance > (distance.toFixed(0)) && '(Lưu ý bạn chưa hoàn thành thử thách)'}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => {
                                if (map?.distance > (distance.toFixed(0))) {
                                    setShowModal(false);
                                    toast.error("Không được", "Bạn chưa hoàn thành thử thách");
                                    return;
                                }
                                toast.info("Kết thúc", "Bạn đã dừng bộ đếm.");
                                stopTracking();
                                router.replace({
                                    pathname: '/(map)/detail',
                                    params: {
                                        type: "record",
                                        result: JSON.stringify({
                                            elapsedTime,
                                            distance,
                                            caloriesBurned,
                                            speed,
                                            maxSpeed,
                                            level: level,
                                            exerciseId: exercise?.index
                                        }),
                                        map: JSON.stringify(map)
                                    }
                                });
                            }}>
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 300, // Map chiếm một phần màn hình
        zIndex: 0, // Map nằm dưới cùng
    },
    map: {
        width: '100%',
        height: '100%',
    },

    recordBg: {
        width: '100%',
        height: 59,
        zIndex: 3
    },

    item: {
        zIndex: 6,
        width: 46,
        height: 8,
        position: 'absolute',
        alignSelf: 'center',
    },

    border: {
        backgroundColor: '#19A1CB',
        borderRadius: screen.width,
        width: screen.width / 1.68,
        height: screen.width / 1.68,
        justifyContent: 'center',
        alignItems: 'center',
    },

    innerBorder: {
        backgroundColor: 'white',
        borderRadius: screen.width,
        width: screen.width / 2,
        height: screen.width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },

    submitView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        width: '100%'
    },

    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBlock: 10,
        width: '70%',
        backgroundColor: '#FFCA28',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    submitText: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 24,
        color: 'white'
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    modalTitle: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 36,
        color: 'white',
        textAlign: 'center',
        width: '80%',
        lineHeight: 38
    },

    modalButton: {
        paddingBlock: 6,
        paddingHorizontal: 25,
        backgroundColor: 'white',
        marginTop: 40
    },

    modalButtonText: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#19A1CB'
    }
});