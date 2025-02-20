import assets from "@/assets"
import Header from "@/components/Headers/header-home"
import screen from "@/utils/screen"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, TouchableOpacity, View, Image, Text, ScrollView } from "react-native"
import MapView from "react-native-maps"

const MapSelectionScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontSize: 24, color: 'white' }}>Bản đồ</Text>}
                rightIcon={<View />}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>CÔNG VIÊN GIA ĐỊNH</Text>
                    <Text style={styles.address}>P3, Gò Vấp, TP.HCM</Text>

                    <View style={{ width: '100%', height: screen.width / 1.5625 }}>
                        <MapView
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>

                    <View style={styles.informationWrapper}>
                        <View style={styles.item}>
                            <Text style={styles.value}>Open</Text>
                            <Text style={styles.text}>Status</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.value}>4 <Text style={{ fontSize: 18 }}>⭐</Text></Text>
                            <Text style={styles.text}>Rate</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.value}>Good</Text>
                            <Text style={styles.text}>Weather</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.value}>Beginer</Text>
                            <Text style={styles.text}>Level</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.description}>
                    <Text style={{ fontSize: 14 }}>
                        <Text style={{ fontWeight: 'bold' }}>Mô tả: </Text>
                        Phù hợp với người  mới bắt đầu, độ dài phù hợp, bằng phẳng, ít chướng ngại vật, nhiều cây xanh.
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default MapSelectionScreen;

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

    title: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 24,
        color: '#342E2E'
    },

    address: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 15,
        color: '#342E2E',
        marginBottom: 15
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
        paddingHorizontal: 20
    },

    text: {
        fontSize: 20,
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

    description: {
        backgroundColor: 'rgba(25, 161, 203, 0.16)',
        paddingBlock: 30,
        paddingHorizontal: 15,
        paddingBottom: screen.width * 0.2
    }
});