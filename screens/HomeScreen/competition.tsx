import assets from "@/assets";
import Star from "@/components/ui/star";
import { ensureHttps, getRandomColor } from "@/utils";
import screen from "@/utils/screen";
import React from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"

interface CompetitionProps {
    users: any[];
    pointsGained: number;
}

const Competition: React.FC<CompetitionProps> = ({ users, pointsGained }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={users && users.length > 0 ? users[0]?.avatar ? { uri: ensureHttps(users[0]?.avatar) } : assets.image.avatar : assets.image.avatar} style={styles.avatar} />
                <View style={{ width: '50%' }}>
                    <Text style={styles.title}>Xếp hạng tuần này</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.mainScore}>Hạng 1</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                        <View>
                            <Text style={styles.extraText}>Điểm cao nhất</Text>
                            <Text style={styles.extraScore}>{users && users.length > 0 ? users[0]?.totalPoints ?? 0 : 0}</Text>
                        </View>
                        <View>
                            <Text style={styles.extraText}>Điểm hôm nay</Text>
                            <Text style={styles.extraScore}>{pointsGained > 0 ? `+${pointsGained}` : 0}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: 'white', paddingBlock: 2, paddingHorizontal: 10 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBlock: 15,
                            paddingHorizontal: 10,
                            gap: 25
                        }}>
                            <Star size={37} text={String(index + 1)} color={getRandomColor()} />
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                <Image source={item?.avatar ? { uri: ensureHttps(item?.avatar) } : assets.image.avatar} style={{ width: 40, height: 40, borderRadius: screen.width }} />
                                <View style={{}}>
                                    <Text style={styles.name}>{item?.fullname ?? 'Nguyễn Văn A'}</Text>
                                    <Text style={[styles.extraText, { color: '#19A1CB', fontWeight: 'bold' }]}>{item?.totalPoints ?? 0} điểm</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={assets.image.gift} style={{ width: 25, height: 25 }} />
                                <Text style={[styles.mainScore, { color: '#FFB300' }]}>500</Text>
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

export default Competition;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    avatar: {
        width: 89,
        height: 89,
        borderRadius: screen.width
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

    prize: {
        width: 37,
        height: 37
    },

    name: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#342E2E'
    },
})