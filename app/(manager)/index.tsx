import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import Loading from "@/components/Loadings/loading";
import { getTransactions } from "@/helpers/api";
import { formatTimeAndDay } from "@/utils";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from "react-native";


export default () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getItems = async () => {
        setLoading(true);
        await getTransactions().then((res) => {
            setTransactions(res);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getItems()
    }, []);

    return (
        <View style={styles.container}>
            <Header
                leftIcon={<View />}
                rightIcon={
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <TouchableOpacity onPress={() => router.push("/setting")}>
                            <Image source={assets.image.setting} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    </View>
                }
            />

            <Text style={{ marginTop: 30, marginBottom: 15, textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#89AC46', fontStyle: 'italic' }}>Lịch sử thanh toán</Text>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <View style={{ padding: 10, borderRadius: 5, backgroundColor: "#FFDDAB", justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={assets.image.premium} style={{ width: 24, height: 24 }} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <View style={{ gap: 4 }}>
                                    <Text
                                        style={{ fontWeight: 'bold', fontSize: 16 }}
                                    >
                                        Thanh toán gói Premium
                                    </Text>
                                    <Text
                                        style={{ fontStyle: 'italic', maxWidth: '80%' }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        Mã user: {item.userId.slice(0, 8)}
                                    </Text>
                                    <Text
                                        style={{ fontSize: 14, color: '#C14600' }}
                                    >
                                        Trạng thái: {item.status === "PAID" ? "Thành công" : "Thất bại"}
                                    </Text>
                                    <Text
                                        style={{ fontSize: 13, color: '#BDB395' }}
                                    >
                                        Ngày thanh toán: {formatTimeAndDay(item.createdAt, "date")}
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 18, fontFamily: 'Inter', color: "#EC5228", fontWeight: 'bold' }}>
                                    {item.amount.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </Text>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={{ gap: 8, padding: 10 }}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={getItems} />
                    }
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Không có dữ liệu</Text>
                        </View>
                    }
                />

                {loading && <Loading size={20} backgroundColor="white" />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    cardContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        padding: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8
    }
})
