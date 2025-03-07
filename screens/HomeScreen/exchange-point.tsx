import assets from "@/assets";
import BaseBlank from "@/components/Blanks/default-blank";
import BaseButton from "@/components/Buttons/base-button";
import Loading from "@/components/Loadings/loading";
import { firestore } from "@/lib/firebase-config";
import { useAuth } from "@/providers";
import { ensureHttps, toast } from "@/utils";
import screen from "@/utils/screen";
import { collection, doc, getDocs, setDoc } from "@firebase/firestore";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ExchangePointProps {
    userInformation: any;
    setUserInformation: (userInformation: any) => void;
}

const ExchangePoint: React.FC<ExchangePointProps> = ({ userInformation, setUserInformation }) => {
    const [items, setItems] = useState<any[]>([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [exchangeLoading, setExchangeLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState<any>(null);

    const getItems = async () => {
        setLoading(true);
        await getDocs(collection(firestore, "items")).then((res) => {
            setItems(res.docs.map(doc => doc.data()));
        }).finally(() => setLoading(false));
    }

    const handleExchange = async () => {
        setExchangeLoading(true);

        if (!userInformation || !item) {
            toast.error("Lỗi", "Lỗi hệ thống, vui lòng kiểm tra lại.");
            setShowModal(false);
            setExchangeLoading(false);
            return;
        }

        if (userInformation?.totalPoints < item?.pointsCost) {
            toast.error("Lỗi", "Bạn không đủ điểm để đổi quà này.");
            setShowModal(false);
            setExchangeLoading(false);
            return;
        }

        const point = (userInformation?.totalPoints ?? 0) - (item?.pointsCost ?? 0);
        await setDoc(doc(firestore, "informations", userInformation?.userId), {
            ...userInformation,
            totalPoints: point
        }).then(() => {
            setUserInformation({
                ...userInformation,
                totalPoints: point
            });
        }).finally(() => {
            setExchangeLoading(false);
            setShowModal(false);
        });
    }

    useEffect(() => {
        getItems();
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowModal(false); // Reset modal khi rời khỏi màn hình
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={userInformation?.avatar ? { uri: ensureHttps(userInformation?.avatar) } : assets.image.avatar} style={styles.avatar} />
                <View style={{ width: '50%' }}>
                    <Text style={styles.title}>Điểm đang có:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {exchangeLoading ? <ActivityIndicator size={40} /> : <Text style={styles.mainScore}>{userInformation?.totalPoints ?? 0}</Text>}
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
                                <Image source={item?.imageUrl ? { uri: ensureHttps(item?.imageUrl) } : assets.image.self_improvement} style={styles.prize} />
                                <View style={{ flex: 1, gap: 5 }}>
                                    <Text style={[styles.extraText, { fontWeight: 'bold' }]}>{item?.category ?? 'Voucher'}</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={styles.name}>{item?.title ?? 'Giảm giá khóa học Yoga cho nữ 30%'}</Text>
                                        <BaseButton
                                            title={item?.pointsCost ?? 0}
                                            onPress={() => {
                                                setItem(item);
                                                setShowModal(true);
                                            }}
                                            buttonStyle={{ alignSelf: 'flex-start', width: 'auto', paddingBlock: 4, paddingHorizontal: 20 }}
                                            titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                                            viewStyle={{ alignSelf: 'flex-start' }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={<BaseBlank onReload={getItems} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 5, paddingBlock: 10 }}
                />

                {loading && <Loading size={40} />}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.center}>
                    <View style={{ backgroundColor: '#19A1CB', paddingBlock: 30, width: '100%', alignItems: 'center' }}>
                        <Text style={styles.modalTitle}>Xác nhận đổi ?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleExchange}>
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    modalTitle: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 36,
        color: 'white',
        textAlign: 'center',
        width: '80%',
        lineHeight: 38
    },

    modalButton: {
        paddingBlock: 6,
        paddingHorizontal: 25,
        backgroundColor: 'white',
        marginTop: 40
    },

    modalButtonText: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#19A1CB'
    }
})