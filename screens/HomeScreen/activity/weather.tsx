import assets from "@/assets"
import Loading from "@/components/Loadings/loading"
import useWeather from "@/hooks/useWeather"
import { formatTimeAndDay } from "@/utils"
import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"

const WeatherActivity = () => {
    const { weather, loading } = useWeather();
    
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>Thời tiết</Text>
            <View style={{ paddingHorizontal: 15 }}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 14 }}>{formatTimeAndDay(new Date())}</Text>
                        <Text style={styles.text}>Mây rải rác</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Image source={assets.image.sunny} style={{ width: 79, height: 74 }} />
                        <View>
                            <Text style={{ fontWeight: 'regular', fontFamily: 'Jomhuria', fontSize: 64, color: '#342E2E', marginTop: -20 }}>{weather?.current?.temp_c ?? '31'}°C</Text>
                            <Text style={{ fontWeight: 'regular', fontFamily: 'Jomhuria', fontSize: 32, color: '#8A8A8A', marginTop: -40 }}>{weather?.current?.temp_f ?? '87'}°F</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Khả năng có mưa</Text>
                    <Text style={styles.text}>1%</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Độ ẩm</Text>
                    <Text style={styles.text}>{weather?.current?.humidity ?? '16'}%</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Gió</Text>
                    <Text style={styles.text}>{weather?.current?.wind_mph ?? '6'} dặm/giờ</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Chất lượng không khí</Text>
                    <Text style={[styles.text, { color: '#23B238' }]}>Vừa phải</Text>
                </View>

                {loading && <Loading size={20} />}
            </View>
        </View>
    )
}

export default WeatherActivity;

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
        paddingBlock: 15,
        paddingHorizontal: 20
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 24,
        color: 'black'
    },

    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#595050'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(25, 161, 203, 0.35)',
        paddingBlock: 2,
    },
})