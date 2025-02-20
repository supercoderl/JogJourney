import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import React from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"

const ExchangePoint = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={assets.image.avatar} style={styles.avatar} />
                <View style={{ width: '50%' }}>
                    <Text style={styles.title}>Điểm đang có:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.mainScore}>950</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={(item) => item.toString()}
                renderItem={() => (
                    <View style={{ backgroundColor: 'white', paddingBlock: 2, paddingHorizontal: 10 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBlock: 15,
                            paddingHorizontal: 10,
                            gap: 25
                        }}>
                            <Image source={assets.image.self_improvement} style={styles.prize} />
                            <View style={{ flex: 1, gap: 5 }}>
                                <Text>Voucher</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.name}>Giảm giá khóa học Yoga cho nữ 30%</Text>
                                    <BaseButton
                                        title="300"
                                        onPress={() => { }}
                                        buttonStyle={{ alignSelf: 'flex-start', width: 'auto', paddingBlock: 4, paddingHorizontal: 20 }}
                                        titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                                        viewStyle={{ alignSelf: 'flex-start' }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 5, paddingBlock: 10 }}
            />
        </View>
    )
}

export default ExchangePoint;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    avatar: {
        width: 89,
        height: 89,
    },

    card: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBlock: 20,
        backgroundColor: 'white',
        gap: 15
    },

    title: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#342E2E'
    },

    mainScore: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 40,
        color: '#19A1CB'
    },

    extraText: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#8A8A8A'
    },

    extraScore: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#8A8A8A'
    },

    prize: {
        width: 66,
        height: 66
    },

    name: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#342E2E',
        width: '75%'
    },
})