import assets from "@/assets"
import Header from "@/components/Headers/header-home"
import Horizontal from "@/components/Horizontal"
import screen from "@/utils/screen"
import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { TouchableOpacity, View, Image, Text, StyleSheet, ScrollView } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { LineChart } from "react-native-gifted-charts";
import BaseButton from "@/components/Buttons/base-button"
import InformationDetail from "@/screens/HomeScreen/detail/information"
import { useAuth } from "@/providers"
import { addDoc, collection, doc, setDoc, updateDoc } from "@firebase/firestore"
import { firestore } from "@/lib/firebase-config"
import useCurrentLocation from "@/hooks/useLocation"

const DetailScreen: React.FC = () => {
    const { user, userInformation, setUserInformation } = useAuth();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [map, setMap] = useState<any>(null);
    const [infoUser, setInfoUser] = useState<any[]>([]);
    const [infoData, setInfoData] = useState<any[]>([]);
    const [type, setType] = useState<string>('record');
    const { location } = useCurrentLocation();

    const d1 = [
        { value: 88, label: '8:30', showXAxisIndex: true },
        { value: 105 },
        { value: 103 },
        { value: 118 },
        { value: 114 },
        { value: 130, label: '9:00', showXAxisIndex: true },
        { value: 110 },
        { value: 125 },
        { value: 140 },
        { value: 150, label: '9:30', showXAxisIndex: true },
        { value: 145 },
        { value: 140 },
        { value: 130 },
        { value: 132 },
        { value: 95, label: '10:00', showXAxisIndex: true },
        { value: 94 },
    ];

    const handleSave = async () => {
        const body = {
            userId: user.uid,
            mapId: map?.id ?? null,
            levelId: result?.level?.id ?? null,
            exerciseId: result?.exerciseId,
            status: true,
            completedAt: new Date(),
            elapsedTime: result?.elapsedTime ?? 0,
            distance: result?.distance ?? 0,
            caloriesBurned: result?.caloriesBurned ?? 0,
            speed: result?.speed ?? 0,
            maxSpeed: result?.maxSpeed ?? 0
        }

        setLoading(true);

        await addDoc(collection(firestore, 'challenges'), body).then(async () => {
            const promises = [
                ...(result?.level ? [updateDailyProgress(result.level)] : []),
                ...(result?.level ? [updateUserInformation(result.level)] : [])
            ];

            await Promise.allSettled(promises);
            router.push('/(map)/save');
            if (result?.level) await updateUserInformation(result?.level);
        }).catch(err => console.log(err)).finally(() => setLoading(false));
    }

    const updateUserInformation = async (level: any) => {
        await setDoc(doc(firestore, 'informations', userInformation?.userId), {
            ...userInformation,
            totalPoints: (userInformation?.totalPoints ?? 0) + (level?.score ?? 0)
        }).then(() => {
            setUserInformation({
                ...userInformation,
                totalPoints: (userInformation?.totalPoints ?? 0) + (level?.score ?? 0)
            });
        }).finally(() => setLoading(false));
    }

    const updateDailyProgress = async (level: any) => {
        await addDoc(collection(firestore, 'dailyProgresses'), {
            userId: userInformation.userId,
            date: new Date(),
            pointsGained: (level?.score ?? 0)
        });
    }

    useEffect(() => {
        if (params) {
            if (params.result && typeof params.result === 'string') {
                const parsedResult = JSON.parse(params.result);
                setResult((prev: any) => {
                    if (JSON.stringify(prev) !== JSON.stringify(parsedResult)) {
                        setInfoData([
                            {
                                value: ((parsedResult?.elapsedTime || 0) / 60).toFixed(0), // Lấy từ result nếu có
                                text: 'Thời gian chạy (phút)'
                            },
                            {
                                value: ((parsedResult.distance || 0) / 1000).toFixed(3),
                                text: 'Quãng đường (km)'
                            },
                            {
                                value: 0,
                                text: 'Bước chân \n\n'
                            },
                            {
                                value: (parsedResult.caloriesBurned || 0).toFixed(2),
                                text: 'Năng lượng tiêu hao (kcal)'
                            }
                        ]);

                        setInfoUser([
                            {
                                value: 0,
                                text: 'Nhịp tim trung bình'
                            },
                            {
                                value: 0,
                                text: 'Nhịp tim cao nhất \n\n'
                            },
                            {
                                value: ((parsedResult.speed ?? 1.2) * 3.6).toFixed(2),
                                text: 'Tốc độ trung bình (km/h)'
                            },
                            {
                                value: ((parsedResult.maxSpeed ?? 1.2) * 3.6).toFixed(2),
                                text: 'Tốc độ cao nhất (km/h)'
                            }
                        ])

                        return parsedResult; // Cập nhật result
                    }
                    return prev;
                });
            }

            if (params.map && typeof params.map === 'string') {
                const parsedMap = JSON.parse(params.map);
                setMap((prev: any) => (JSON.stringify(prev) !== JSON.stringify(parsedMap) ? parsedMap : prev));
            }

            if (params.type && typeof params.type === 'string') {
                setType((prev: any) => (prev !== params.type ? params.type : prev));
            }
        }
    }, [params]);

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.replace('/(home)')}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontSize: 24, color: 'white' }}>Thông tin chi tiết</Text>}
                rightIcon={<View />}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <View style={{ width: '100%', height: screen.width / 1.5625, borderRadius: 15, overflow: 'hidden' }}>
                        <MapView
                            style={{ width: '100%', height: '100%' }}
                            region={{
                                latitude: location?.latitude ?? 0,
                                longitude: location?.longitude ?? 0,
                                latitudeDelta: 0.0001,
                                longitudeDelta: 0.001,
                            }}
                            zoomEnabled={false}
                            scrollEnabled={false}
                        >
                            <Marker
                                coordinate={{ latitude: location?.latitude ?? 0, longitude: location?.longitude ?? 0 }}
                                title=""
                                description=""
                            />
                        </MapView>
                    </View>

                    {params?.map && typeof params.map === "object" && Object.keys(params?.map).length > 0 && (
                        <View style={{ paddingBlock: 10, gap: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#342E2E' }}>{map?.name ?? ''}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Image source={assets.image.medal} style={{ width: 38, height: 38 }} />
                                <Text style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.25)' }}>Hoàn thành</Text>
                            </View>
                        </View>
                    )}

                    <InformationDetail data={infoData} />
                </View>

                <Horizontal height={22} color="rgba(0, 0, 0, 0.03)" />

                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                        <Image source={assets.image.cardiogram} style={{ width: 62, height: 55.1 }} />
                        <Text style={styles.detailTitle}>Nhịp tim</Text>
                    </View>

                    <InformationDetail data={infoUser} />

                    <View style={{ paddingTop: 20, paddingBottom: 60, overflow: 'hidden' }}>
                        <LineChart
                            data={d1}
                            maxValue={180}
                            stepValue={30}
                            noOfSections={5}
                            spacing={16}
                            hideDataPoints
                            color="#19A1CB"
                            yAxisColor={'#19A1CB'}
                            yAxisOffset={60}
                            yAxisIndicesColor={'#19A1CB'}
                            yAxisIndicesWidth={10}
                            yAxisThickness={0}
                            dashGap={0}
                            xAxisColor='rgba(0, 0, 0, 0.25)'
                            secondaryLineConfig={{ color: '#19A1CB' }}
                            secondaryYAxis={{
                                maxValue: 0.2,
                                noOfSections: 4,
                                showFractionalValues: true,
                                roundToDigits: 3,
                                yAxisColor: '#19A1CB',
                                yAxisIndicesColor: '#19A1CB',
                            }}
                            xAxisLabelTextStyle={{ width: 80, marginLeft: -36 }}
                        />
                    </View>
                </View>

                {type === 'record' && <BaseButton
                    title="Lưu lại"
                    onPress={handleSave}
                    buttonStyle={{
                        borderRadius: 0,
                        height: 66
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
                    loading={loading}
                />}
            </ScrollView>
        </View>
    )
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    contentContainer: {
        paddingHorizontal: 15,
        paddingTop: 40
    },

    informationWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Để xuống dòng khi đủ 2 item
        justifyContent: 'center',
        alignItems: 'center',
    },

    item: {
        width: '48%', // Chia đôi màn hình, chừa 2% margin
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBlock: 10,
        paddingHorizontal: 20,
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

    detailTitle: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 40,
        color: '#342E2E'
    }
});