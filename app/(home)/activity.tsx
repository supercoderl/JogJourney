import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import Horizontal from "@/components/Horizontal";
import screen from "@/utils/screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, FlatList, ScrollView } from "react-native";

export default function ActivityScreen() {
    return (
        <View style={styles.container}>
            <Header
                leftIcon={<View />}
                rightIcon={
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <TouchableOpacity onPress={() => router.push('/(profile)/edit-information')}>
                            <MaterialCommunityIcons name="chart-bar" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(profile)/setting')}>
                            <MaterialCommunityIcons name="bell-badge-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                }
            />

            <ScrollView style={{ gap: 10 }}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>Thời tiết</Text>
                    <View style={{ paddingHorizontal: 15 }}>
                        <View style={styles.contentContainer}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 14 }}>09:30 Chủ Nhật</Text>
                                <Text style={styles.text}>Mây rải rác</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Image source={assets.image.sunny} style={{ width: 79, height: 74 }} />
                                <View>
                                    <Text style={{ fontWeight: 'regular', fontFamily: 'Jomhuria', fontSize: 32, color: '#342E2E' }}>31°C</Text>
                                    <Text style={{ fontWeight: 'regular', fontFamily: 'Jomhuria', fontSize: 16, color: '#8A8A8A' }}>87°F</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Khả năng có mưa</Text>
                            <Text style={styles.text}>17%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Độ ẩm</Text>
                            <Text style={styles.text}>68%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Gió</Text>
                            <Text style={styles.text}>8 dặm/giờ</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Chất lượng không khí</Text>
                            <Text style={[styles.text, { color: '#23B238' }]}>Vừa phải</Text>
                        </View>
                    </View>
                </View>

                <Horizontal height={10} color="rgba(0, 0, 0, 0.03)" />

                <View style={styles.itemContainer}>
                    <Text style={styles.title}>Chọn bài tập</Text>

                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7]}
                        keyExtractor={(item) => item.toString()}
                        renderItem={() => (
                            <View style={{ padding: 10 }}>
                                <MaterialCommunityIcons name="run" size={50} color="#8A8A8A" />
                                <Text style={[styles.text, { color: '#8A8A8A' }]}>Chạy bộ</Text>
                            </View>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBlock: 5 }}
                    />
                </View>

                <Horizontal height={10} color="rgba(0, 0, 0, 0.03)" />

                <View style={styles.itemContainer}>
                    <Text style={styles.title}>Hôm nay</Text>

                    <View style={{ paddingBlock: 20, position: 'relative' }}>
                        <View style={{
                            backgroundColor: '#19A1CB',
                            width: 162,
                            height: 162,
                            borderRadius: screen.width,
                            borderWidth: 10,
                            borderColor: '#07476D',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1
                        }}>
                            <MaterialCommunityIcons name="run" size={90} color="white" />
                        </View>

                        <View style={{
                            position: 'absolute', width: '65%', zIndex: 0, top: 25.225, left: '30%'
                        }}>
                            <View style={[styles.infoBox, { backgroundColor: "#1DA1F2" }]}>
                                <Text style={styles.infoText}>5,2 km</Text>
                            </View>
                            <View style={[styles.infoBox, { backgroundColor: "#28A745" }]}>
                                <Text style={styles.infoText}>45 phút</Text>
                            </View>
                            <View style={[styles.infoBox, { backgroundColor: "#FFC107" }]}>
                                <Text style={styles.infoText}>680 kcal</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Horizontal height={10} color="rgba(0, 0, 0, 0.03)" />

                <View style={styles.itemContainer}>
                    <Text style={styles.title}>Gợi ý luyện tập</Text>

                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7]}
                        keyExtractor={(item) => item.toString()}
                        renderItem={() => (
                            <View style={{ borderRadius: 10 }}>
                                <Image source={assets.image.image} style={{ width: 311, height: 184, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                                <View style={{ backgroundColor: '#19A1CB', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 15 }}>
                                    <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 20, color: '#07476D' }}>GOAL 5km</Text>
                                    <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 20, color: 'white' }}>Công viên gia định</Text>
                                    <Text style={{ fontWeight: 'regular', fontFamily: 'Inter', fontSize: 13, color: 'white' }}>P3, Gò Vấp, Tp. HCM</Text>
                                </View>
                            </View>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBlock: 15, gap: 8 }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

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

    infoBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 5,
    },

    infoText: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    }
});