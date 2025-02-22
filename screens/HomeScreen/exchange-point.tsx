import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import Loading from "@/components/Loadings/loading";
import { firestore } from "@/lib/firebase-config";
import screen from "@/utils/screen";
import { collection, getDocs } from "@firebase/firestore";
import React, { useEffect, useState } from "react"
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native"

interface ExchangePointProps {
    userInformation: any;
}

const ExchangePoint: React.FC<ExchangePointProps> = ({ userInformation }) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getItems = async () => {
        setLoading(true);
        await getDocs(collection(firestore, "items")).then((res) => {
            setItems(res.docs.map(doc => doc.data()));
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={userInformation?.avatar ? { uri: userInformation?.avatar } : assets.image.avatar} style={styles.avatar} />
                <View style={{ width: '50%' }}>
                    <Text style={styles.title}>Điểm đang có:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.mainScore}>{userInformation?.totalPoints ?? 0}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={items}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getItems} />}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: 'white', paddingBlock: 2, paddingHorizontal: 10 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBlock: 15,
                                paddingHorizontal: 10,
                                gap: 25
                            }}>
                                <Image source={item?.imageUrl ? { uri: item?.imageUrl } : assets.image.self_improvement} style={styles.prize} />
                                <View style={{ flex: 1, gap: 5 }}>
                                    <Text style={[styles.extraText, { fontWeight: 'bold' }]}>{item?.category ?? 'Voucher'}</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.name}>{item?.title ?? 'Giảm giá khóa học Yoga cho nữ 30%'}</Text>
                                        <BaseButton
                                            title={item?.pointsCost ?? 0}
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

                {loading && <Loading size={40} />}
            </View>
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