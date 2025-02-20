import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import Horizontal from "@/components/Horizontal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"

interface ArchivementMeProps {
    onChangePage: () => void;
}

const ArchivementMe: React.FC<ArchivementMeProps> = ({ onChangePage }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={assets.image.avatar} style={styles.avatar} />
                <View style={{ width: '50%' }}>
                    <Text style={styles.title}>Điểm:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.mainScore}>950</Text>
                        <BaseButton
                            title="Đổi điểm"
                            onPress={onChangePage}
                            buttonStyle={{ alignSelf: 'flex-start', width: 'auto', paddingBlock: 4, paddingHorizontal: 8 }}
                            titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                            viewStyle={{ alignSelf: 'flex-start' }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                        <View>
                            <Text style={styles.extraText}>Điểm cao NH</Text>
                            <Text style={styles.extraScore}>1050</Text>
                        </View>
                        <View>
                            <Text style={styles.extraText}>Điểm hôm nay</Text>
                            <Text style={styles.extraScore}>+50</Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={(item) => item.toString()}
                renderItem={() => (
                    <View style={{ backgroundColor: 'white', paddingBlock: 2, paddingHorizontal: 10 }}>
                        <Text style={styles.extraText}>21/10/2024, 16:00</Text>
                        <Horizontal height={1} color="#D9D9D9" />
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBlock: 15, paddingHorizontal: 10 }}>
                            <MaterialCommunityIcons name="run" size={44} color='#1C1B1F' />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.listText}>Chạy bộ buổi chiều</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.listStatus}>Đã hoàn thành</Text>
                                    <Text style={[styles.extraText, { color: '#19A1CB' }]}>+50</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingBlock: 10, paddingHorizontal: 30 }}
            />
        </View>
    )
}

export default ArchivementMe;

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
        fontSize: 20,
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

    listText: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#342E2E',
        marginBottom: 10
    },

    listStatus: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#23B238'
    }
})