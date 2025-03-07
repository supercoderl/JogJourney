import assets from '@/assets';
import Header from '@/components/Headers/header-home';
import Loading from '@/components/Loadings/loading';
import { getChallengesGroupedByDate } from '@/helpers/api';
import { useAuth } from '@/providers';
import screen from '@/utils/screen';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';

export default function PaymentScreen() {
    const { userInformation } = useAuth();
    const [groupedChallenges, setGroupedChallenges] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);

    const getChallenges = async () => {
        setLoading(true);
        await getChallengesGroupedByDate(userInformation?.userId).then((res) => {
            setGroupedChallenges(res);
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        getChallenges();
    }, []);

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontSize: 24, color: 'white' }}>Thanh toán</Text>}
                rightIcon={
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <TouchableOpacity onPress={() => router.push('/(profile)/edit-information')}>
                            <Image source={assets.image.edit} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(profile)/setting')}>
                            <Image source={assets.image.setting} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    </View>
                }
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Thống kê</Text>
                <View style={styles.information}>
                    <Image source={userInformation?.avatar ? { uri: userInformation?.avatar } : assets.image.account_circle} style={styles.avatar} />
                    <Text style={styles.name}>{userInformation?.fullname ?? 'Nguyễn Văn A'}</Text>
                </View>

                <FlatList
                    data={groupedChallenges}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.date}>{item.date}</Text>
                            <View style={styles.item}>
                                <Text style={styles.distance}>Quãng đường</Text>
                                <View style={[styles.itemRow, { gap: 30, alignItems: 'center' }]}>
                                    <View style={styles.result}>
                                        <View style={{ width: '100%', height: '100%', borderRadius: screen.width, borderWidth: 10, borderColor: '#07476D' }} />
                                        <View style={{ position: 'absolute', top: 10, left: 23 }}>
                                            <Text style={{ fontSize: 96, fontFamily: 'Jomhuria', color: '#342E2E', lineHeight: 96, textAlign: 'center' }}>{(item.totalDistance / 1000).toFixed(1)}</Text>
                                            <Text style={{ fontSize: 40, fontFamily: 'Jomhuria', color: '#342E2E', lineHeight: 40, marginTop: -35, textAlign: 'center' }}>km</Text>
                                        </View>
                                    </View>
                                    <View style={{ gap: 10 }}>
                                        <View style={[styles.itemRow, { gap: 15 }]}>
                                            <Image source={assets.image.step} style={{ width: 24, height: 26 }} />
                                            <View>
                                                <Text style={styles.itemTitle}>Bước</Text>
                                                <Text style={styles.itemText}>1200</Text>
                                            </View>
                                        </View>

                                        <View style={[styles.itemRow, { gap: 15 }]}>
                                            <Image source={assets.image.electric} style={{ width: 24, height: 24 }} />
                                            <View>
                                                <Text style={styles.itemTitle}>Calo</Text>
                                                <Text style={styles.itemText}>{item.totalCalories.toFixed(2)}</Text>
                                            </View>
                                        </View>

                                        <View style={[styles.itemRow, { gap: 15 }]}>
                                            <Image source={assets.image.speed} style={{ width: 24, height: 23 }} />
                                            <View>
                                                <Text style={styles.itemTitle}>Tốc độ</Text>
                                                <Text style={styles.itemText}>{item.avgSpeed.toFixed(2)} km/h</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />

                {loading && <Loading size={40} />}
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

    contentContainer: {
        padding: 30,
        flex: 1,
    },

    title: {
        fontSize: 36,
        color: '#342E2E',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    result: {
        width: 122,
        height: 122,
        backgroundColor: 'white',
        borderRadius: screen.width,
    },

    information: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBlock: 10
    },

    avatar: {
        width: 28,
        height: 28,
        borderRadius: screen.width
    },

    name: {
        fontSize: 20,
        color: '#342E2E',
        fontWeight: 'bold',
    },

    date: {
        fontSize: 24,
        color: '#342E2E',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10
    },

    item: {
        backgroundColor: '#19A1CB',
        padding: 15,
        borderRadius: 10,
        width: '100%'
    },

    distance: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

    itemRow: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },

    itemTitle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },

    itemText: {
        fontSize: 15,
        color: '#342E2E',
        fontWeight: 'bold',
    }
});