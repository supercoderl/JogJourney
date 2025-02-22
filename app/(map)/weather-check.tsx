import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import Header from "@/components/Headers/header-home";
import Horizontal from "@/components/Horizontal";
import { formatTimeAndDay, getHourList } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, FlatList } from "react-native";
import useWeather from "@/hooks/useWeather";
import Loading from "@/components/Loadings/loading";

const WeatherCheckScreen: React.FC = () => {
    const { weather, district, loading, error, refresh } = useWeather();

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontSize: 24, color: 'white' }}>Weather check</Text>}
                rightIcon={<View />}
            />

            <View style={{ paddingTop: 10 }}>
                {loading && <Loading size={40} />}
                <Horizontal height={17} color="rgba(0, 0, 0, 0.03)" />

                <View style={styles.contentContainer}>
                    <Text style={styles.district}>{district ?? 'Không xác định'}</Text>
                    <Text style={styles.date}>{formatTimeAndDay(new Date, 'fullDate')}</Text>
                    <Text style={styles.hour}>{formatTimeAndDay(new Date, 'time12h')}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={assets.image.partly_cloudy} style={{ width: 66, height: 66 }} />
                        <Text style={styles.tempText}>{weather?.current?.temp_c ?? '28'}<Text style={{ fontSize: 32 }}>℃</Text></Text>
                    </View>
                    <Text style={styles.date}>Trời có mây và nắng nhẹ</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 5 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, color: '#8A8A8A' }}>Sức gió(km/h)</Text>
                            <Text style={{ paddingTop: 30, fontSize: 24, color: '#19A1CB' }}>{weather?.current?.wind_kph ?? '6'}</Text>
                        </View>
                        <Horizontal width={1} height={50} color="rgba(25, 161, 203, 0.2)" />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, color: '#8A8A8A' }}>Độ ẩm (%)</Text>
                            <Text style={{ paddingTop: 30, fontSize: 24, color: '#19A1CB' }}>{weather?.current?.humidity ?? '16'}</Text>
                        </View>
                    </View>

                    <Horizontal height={8} color="rgba(0, 0, 0, 0.03)" />

                    <FlatList
                        data={getHourList()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.time}>{item}</Text>
                                <Image source={assets.image.partly_cloudy_blur} style={{ width: 34, height: 34, marginTop: 10 }} />
                                <Text style={styles.miniTemp}>{weather?.current?.temp_c ?? '28'}<Text style={{ fontSize: 12 }}>℃</Text></Text>
                            </View>
                        )}
                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-evenly', width: '100%', paddingBlock: 30 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
            }}>
                <BaseButton
                    title="Trang chủ"
                    onPress={() => router.push('/(home)')}
                    buttonStyle={{
                        borderRadius: 0,
                        height: 66
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
                />
            </View>
        </View>
    )
}

export default WeatherCheckScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    contentContainer: {
        paddingBlock: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    district: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#342E2E'
    },

    date: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#19A1CB',
        marginBlock: 5
    },

    hour: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#19A1CB'
    },

    tempText: {
        fontWeight: 'regular',
        fontFamily: 'Jomhuria',
        fontSize: 128,
        color: '#342E2E',
        marginBlock: -40
    },

    time: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#8A8A8A'
    },

    miniTemp: {
        fontSize: 20,
        fontFamily: 'Jomhuria',
        color: '#19A1CB',
        textAlign: 'center'
    }
});