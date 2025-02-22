import Horizontal from "@/components/Horizontal"
import React from "react"
import { View, Text, StyleSheet } from "react-native"

interface MapDetailProps {
    map: any;
    recordInfo: any;
    loading: boolean;
}

const MapDetail: React.FC<MapDetailProps> = ({ map, recordInfo, loading }) => {
    return (
        <View style={[styles.contentContainer, { paddingTop: 25, paddingBlock: 30 }]}>
            <Text style={styles.title}>{map?.name ?? 'CÔNG VIÊN GIA ĐỊNH'}</Text>
            <Horizontal height={1} color="#19A1CB" />
            <View style={styles.informationWrapper}>
                <View style={[styles.itemA]}>
                    <Text style={styles.value}>{recordInfo?.caloriesBurnt ?? 0}</Text>
                    <Text style={styles.text}>Năng lượng (calo)</Text>
                </View>
                <View style={styles.itemB}>
                    <Text style={styles.value}>{recordInfo?.formattedTime ?? 0} min</Text>
                    <Text style={styles.text}>Thời gian chạy</Text>
                </View>
                <View style={styles.itemA}>
                    <Text style={styles.value}>{loading ? 'Đang tải...' : recordInfo?.weather?.current?.temp_c ?? '28'}</Text>
                    <Text style={styles.text}>Nhiệt độ (℃)</Text>
                </View>
                <View style={styles.itemB}>
                    <Text style={styles.value}>123</Text>
                    <Text style={styles.text}>Nhịp tim</Text>
                </View>
                <View style={styles.itemA}>
                    <Text style={styles.value}>1</Text>
                    <Text style={styles.text}>Thử thách</Text>
                </View>
                <View style={styles.itemB}>
                    <Text style={styles.value}>{recordInfo?.stepCount ?? 0}</Text>
                    <Text style={styles.text}>Bước chân</Text>
                </View>
                <View style={styles.itemA}>
                    <Text style={styles.value}>{map?.status ? 'Open' : 'Close'}</Text>
                    <Text style={styles.text}>Status</Text>
                </View>
                <View style={styles.itemB}>
                    <Text style={styles.value}>{map?.address ?? 'P3, Gò Vấp, TP.HCM'}</Text>
                    <Text style={styles.text}>Location</Text>
                </View>
                <View style={styles.itemA}>
                    <Text style={styles.value}>30</Text>
                    <Text style={styles.text}>Participants</Text>
                </View>
                <View style={styles.itemB}>
                    <Text style={styles.value}>{map?.rate ?? 4} <Text style={{ fontSize: 18 }}>⭐</Text></Text>
                    <Text style={styles.text}>Rate</Text>
                </View>
            </View>
        </View>
    )
}

export default MapDetail;

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 30,
        zIndex: 5,
        backgroundColor: 'white'
    },

    informationWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Để xuống dòng khi đủ 2 item
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 24,
        color: '#342E2E',
        marginBottom: 20
    },

    itemA: {
        width: '54%', // Chia đôi màn hình, chừa 2% margin
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBlock: 10,
    },

    itemB: {
        width: '44%', // Chia đôi màn hình, chừa 2% margin
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
        marginBottom: -15,
    },
})