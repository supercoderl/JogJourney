import assets from '@/assets';
import BaseButton from '@/components/Buttons/base-button';
import RadioButton from '@/components/Buttons/radio-button';
import Header from '@/components/Headers/header-home';
import Horizontal from '@/components/Horizontal';
import screen from '@/utils/screen';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
} from 'react-native';

export default function PremiumScreen() {
    const [selectedValue, setSelectedValue] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        await axios.post("https://supercode-payment-api.vercel.app/api/payment/create_payment_url", {
            orderInfo: "Nang cap goi Gold",
            amount: 50000
        }).then((res) => {
            if (res && res.data && res.data.status) {
                router.push({ pathname: '/(profile)/payment', params: { url: res.data.payload } });
            }
        }).catch((err) => console.log(err)).finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontSize: 24, color: 'white' }}>Đăng ký Premium</Text>}
                rightIcon={<View />}
            />

            <View style={styles.row}>
                <View style={styles.item}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Dịch vụ</Text>
                        <Text style={styles.subTitle}>Đăng ký gói premium</Text>
                    </View>
                </View>
                <Horizontal height={80} width={1} color="#D9D9D9" />
                <View style={styles.item}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>50.000</Text>
                        <Text style={styles.subTitle}>Vnd</Text>
                    </View>
                </View>
            </View>


            <View style={styles.formality}>
                <Text style={{ fontSize: 20, color: '#19A1CB' }}>Hình thức thanh toán</Text>
            </View>

            <View style={styles.transfer}>
                <Text style={styles.titleTransfer}>Chuyển khoản/ Banking online</Text>
                <Text style={styles.subTitleTransfer}>Tài khoản sẽ được kích hoạt premie ngay sau khi khách hàng thanh toán thành công</Text>
                <Horizontal height={1} color='#D9D9D9' styles={{ marginBottom: 30 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                    <Image source={assets.image.vnpay} style={{ width: 43, height: 43 }} />
                    <Text style={{ flex: 1, fontSize: 14, color: '#8A8A8A' }}>VNPay</Text>
                    <RadioButton
                        value={'option1'}
                        selected={selectedValue === 'option1'}
                        onPress={setSelectedValue}
                    />
                </View>

                <View style={{ height: screen.height / 7 }} />

                <BaseButton
                    title="Thanh toán"
                    buttonStyle={{ ...styles.buttonTransfer, backgroundColor: selectedValue === null ? 'rgba(25, 161, 203, 0.35)' : '#19A1CB' }}
                    disabled={selectedValue === null}
                    titleStyle={{ textTransform: 'uppercase' }}
                    onPress={handlePay}
                    loading={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBlock: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        marginBottom: 50
    },

    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },

    textContainer: {
        alignItems: 'flex-start', // Giữ text cùng lề trái
    },

    title: {
        fontSize: 14,
        textAlign: 'left'
    },

    subTitle: {
        fontSize: 10,
        textAlign: 'left',
        color: '#D9D9D9'
    },

    formality: {
        backgroundColor: 'rgba(134, 197, 217, 0.32)',
        paddingBlock: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },

    transfer: {
        backgroundColor: 'white',
        paddingBlock: 30,
        paddingHorizontal: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        marginBottom: 50
    },

    titleTransfer: {
        fontSize: 14,
        color: '#19A1CB'
    },

    subTitleTransfer: {
        fontSize: 12,
        color: '#8A8A8A',
        lineHeight: 22,
        maxWidth: '95%',
        marginBottom: 20
    },

    buttonTransfer: {
        width: '90%',
        alignSelf: 'center',
        paddingBlock: 15,
        borderRadius: 24,
    }
});