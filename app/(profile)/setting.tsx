import assets from "@/assets"
import BaseButton from "@/components/Buttons/base-button"
import Header from "@/components/Headers/header-home"
import Horizontal from "@/components/Horizontal"
import { auth, firestore } from "@/lib/firebase-config"
import { useAuth } from "@/providers"
import { router } from "expo-router"
import { signOut } from "firebase/auth"
import React, { useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

const SettingScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { setUser, setUserInformation } = useAuth();

    const handleLogout = async () => {
        setLoading(true);
        await signOut(auth).then(() => {
            setUser(null);
            setUserInformation(null);
            setTimeout(() => router.push('/(auth)/login'));
        }).finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => router.back()}>
                        <Image source={assets.image.left} style={{ width: 24, height: 24 }} />
                        <Text style={{ fontWeight: 'regular', fontFamily: 'Inter', fontSize: 13 }}>Quay lại</Text>
                    </TouchableOpacity>
                }
            />

            <View style={styles.informationWrapper}>
                <Text style={styles.title}>Cài đặt</Text>

                <View style={{ width: '100%' }}>
                    <Horizontal color="#D9D9D9" height={1} />

                    <View style={styles.view}>
                        <Text style={styles.titleService}>Các dịch vụ liên kết</Text>
                        <Text style={styles.service}>Đồng hồ thông minh</Text>
                        <View style={styles.rowService}>
                            <Text style={styles.service}>Đồng bộ với Google fit</Text>
                            <TouchableOpacity>
                                <Text style={styles.textButton}>Tắt</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.service}>Xóa quảng cáo</Text>
                    </View>

                    <Horizontal color="#D9D9D9" height={1} />

                    <View style={styles.view}>
                        <Text style={styles.titleService}>Cài đặt ứng dụng</Text>
                        <View style={styles.rowService}>
                            <Text style={styles.service}>Đơn vị đo</Text>
                            <TouchableOpacity>
                                <Text style={styles.textButton}>kg/cm/km</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowService}>
                            <Text style={styles.service}>Thông báo</Text>
                            <TouchableOpacity>
                                <Text style={styles.textButton}>Tắt</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.service}>Lối tắt ứng dụng</Text>
                        <View style={styles.rowService}>
                            <Text style={styles.service}>Chuyển ngôn ngữ</Text>
                            <TouchableOpacity>
                                <Text style={styles.textButton}>Tiếng Việt</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Horizontal color="#D9D9D9" height={1} />

                    <View style={styles.view}>
                        <Text style={styles.titleService}>Hỗ trợ</Text>
                        <Text style={styles.service}>Phản ánh về ứng dụng</Text>
                    </View>

                    <Horizontal color="#D9D9D9" height={1} />

                    <View style={styles.view}>
                        <Text style={styles.titleService}>Thông tin Jog Journey</Text>
                        <Text style={[styles.service, { textDecorationLine: 'underline' }]}>Tìm chúng tôi trên Facebook</Text>
                        <Text style={styles.service}>Thông tin ứng dụng</Text>
                    </View>

                    <Horizontal color="#D9D9D9" height={1} />
                </View>
            </View>

            <View style={{
                position: 'absolute',
                bottom: 10,
                paddingHorizontal: 30,
                width: '100%'
            }}>
                <BaseButton
                    title="ĐĂNG XUẤT"
                    onPress={handleLogout}
                    titleStyle={{ fontWeight: 'bold' }}
                    loading={loading}
                />
            </View>
        </View>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    informationWrapper: {
        marginTop: 35,
        alignItems: 'center',
    },

    title: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 24,
        color: '#342E2E',
        alignSelf: 'flex-start',
        paddingHorizontal: 30,
        marginBottom: 15
    },

    view: {
        paddingTop: 10,
        paddingBottom: 20,
        gap: 10,
        paddingHorizontal: 30
    },

    titleService: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#595050'
    },

    service: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#595050'
    },

    rowService: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    textButton: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#23B238'
    }
});