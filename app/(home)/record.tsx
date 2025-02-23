import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import Horizontal from "@/components/Horizontal";
import Loading from "@/components/Loadings/loading";
import useCurrentLocation from "@/hooks/useLocation";
import { useAuth } from "@/providers";
import RecordMap from "@/screens/HomeScreen/map/record";
import { toast } from "@/utils";
import screen from "@/utils/screen";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Animated, Modal } from "react-native";
import MapView, { Circle } from "react-native-maps";

export default function RecordScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
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

    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontWeight: 'regular', fontSize: 24, color: 'white' }}>Bấm giờ</Text>}
                rightIcon={
                    <TouchableOpacity onPress={() => router.push('/(map)/weather-check')}>
                        <Image source={assets.image.cloudy} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
            />

            <View style={{ flex: 1 }}>
                <View style={styles.mapContainer}>
                    {location ?
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: location?.latitude ?? 0,
                                longitude: location?.longitude ?? 0,
                                latitudeDelta: 0.001,
                                longitudeDelta: 0.001,
                            }}
                            followsUserLocation
                            provider="google"
                            showsUserLocation={true}
                        >
                            <Circle
                                center={location}
                                radius={50} // Bán kính vùng chính xác
                                strokeColor="rgba(0, 122, 255, 0.5)"
                                fillColor="rgba(0, 122, 255, 0.2)"
                            />
                        </MapView>
                        :
                        <Loading size={40} />}
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
                        handleShowModal={setShowModal}
                        isTracking={isTracking}
                        border={
                            <View style={styles.border}>
                                <TouchableOpacity onPress={() => {
                                    if (!location) {
                                        toast.info("Khoan đã", "Chờ cho bản đồ được tải xong nhé!");
                                        return;
                                    }
                                    toast.info("Bắt đầu", "Hệ thống chuẩn bị bấm giờ trong giây lát!");
                                    startTracking();
                                }}>
                                    <Image source={assets.image.recorder} style={{ width: 72, height: 72 }} />
                                </TouchableOpacity>
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

                    <Horizontal height={20} color="rgb(240, 238, 238)" styles={{ zIndex: 8 }} />

                    <View style={[styles.contentContainer, { paddingTop: 10, paddingBlock: 30 }]}>
                        <View style={styles.informationWrapper}>
                            <View style={[styles.itemA]}>
                                <Text style={styles.value}>{(distance / 1000).toFixed(3)}</Text>
                                <Text style={styles.text}>Km</Text>
                            </View>
                            <View style={styles.itemB}>
                                <Text style={styles.value}>300</Text>
                                <Text style={styles.text}>Bước</Text>
                            </View>
                            <View style={styles.itemA}>
                                <Text style={styles.value}>{caloriesBurned.toFixed(1)}</Text>
                                <Text style={styles.text}>Calo</Text>
                            </View>
                            <View style={styles.itemB}>
                                <Text style={styles.value}>{(speed * 3.6).toFixed(2)}</Text>
                                <Text style={styles.text}>Km / h</Text>
                            </View>
                        </View>
                    </View>

                    <Horizontal height={20} color="rgb(240, 238, 238)" styles={{ zIndex: 6 }} />

                    <View style={styles.submitView}>
                        <TouchableOpacity style={styles.submitButton} onPress={() => {
                            if (!userInformation?.type || userInformation?.type === 'free') {
                                toast.error("Không được", "Bạn phải đăng ký gói Pro để vào thử thách");
                                return;
                            }
                            router.push('/(map)/challenge')
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
                        <Text style={styles.modalTitle}>Đồng ý dừng ?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => {
                                toast.info("Kết thúc", "Bạn đã dừng bộ đếm.");
                                stopTracking();
                                router.push({
                                    pathname: '/(map)/detail', params: {
                                        type: "record", result: JSON.stringify({
                                            elapsedTime,
                                            distance,
                                            caloriesBurned,
                                            speed,
                                            maxSpeed,
                                            exerciseId: 1,
                                            mapId: null,
                                            level: null
                                        })
                                    }
                                })
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

    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 30,
        zIndex: 5,
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
        borderWidth: 20,
        borderColor: '#19A1CB',
        borderRadius: screen.width,
        width: screen.width / 1.68,
        height: screen.width / 1.68,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    iconButton: {
        width: 20,
        height: 20
    },

    textButton: {
        fontWeight: 'regular',
        fontFamily: 'Jomhuria',
        fontSize: 40,
        color: 'rgba(0, 0, 0, 0.6)'
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    informationWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Để xuống dòng khi đủ 2 item
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemA: {
        width: '68%', // Chia đôi màn hình, chừa 2% margin
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBlock: 10,
    },

    itemB: {
        width: '30%', // Chia đôi màn hình, chừa 2% margin
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBlock: 10,
    },

    text: {
        fontSize: 14,
        fontWeight: 'regular',
        fontFamily: 'Lohit Bengali',
        color: '#19A1CB'
    },

    value: {
        fontWeight: 'regular',
        fontFamily: 'Jomhuria',
        fontSize: 40,
        color: '#342E2E',
        marginBottom: -15
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