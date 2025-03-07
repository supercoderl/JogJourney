import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import Horizontal from "@/components/Horizontal";
import { useAuth } from "@/providers";
import { calculateAge, ensureHttps, toast } from "@/utils";
import screen from "@/utils/screen";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";

const CenterInfomation = ({ userInformation }: { userInformation: any }) => {
    return (
        <View style={styles.centerInformationWrapper}>
            <View style={[styles.information, { borderRightWidth: 2, borderRightColor: 'white' }]}>
                <Text style={styles.informationText}>{userInformation?.height ?? 0} cm</Text>
                <Text style={styles.informationValue}>Height</Text>
            </View>
            <View style={styles.information}>
                <Text style={styles.informationText}>{calculateAge(userInformation?.birthday ?? '01/01/1999')}</Text>
                <Text style={styles.informationValue}>Years old</Text>
            </View>
            <View style={[styles.information, { borderLeftWidth: 2, borderLeftColor: 'white' }]}>
                <Text style={styles.informationText}>{userInformation?.weight ?? 0} kg</Text>
                <Text style={styles.informationValue}>Weight</Text>
            </View>
        </View>
    )
}

export default function ProfileScreen() {
    const { userInformation } = useAuth();

    return (
        <View style={styles.container}>
            <Header
                leftIcon={<View />}
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

            <View>
                <View style={styles.informationWrapper}>
                    <Text style={styles.title}>Thông tin cá nhân</Text>
                    <Image
                        source={userInformation?.avatar ? { uri: ensureHttps(userInformation?.avatar) } : assets.image.avatar}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{userInformation?.fullname ?? 'Nguyễn Văn A'}</Text>
                    <Text style={{ fontSize: 13, color: '#342E2E' }}>Việt Nam</Text>

                    <CenterInfomation userInformation={userInformation} />
                </View>

                <Horizontal color="#D9D9D9" height={1} />
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Image source={assets.image.broken_image} style={{ width: 24, height: 24, marginRight: 8 }} />
                        <View style={styles.buttonTextWrapper}>
                            <Text style={styles.buttonTextTitle}>Bài đăng gần đây</Text>
                            <Text style={styles.buttonTextSubTitle}>Không có hoạt động nào</Text>
                        </View>
                        <Image source={assets.image.right_ios} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
                <Horizontal color="#D9D9D9" height={1} />
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/(profile)/analys')}>
                        <Image source={assets.image.chart} style={{ width: 24, height: 24, marginRight: 8 }} />
                        <View style={styles.buttonTextWrapper}>
                            <Text style={styles.buttonTextTitle}>Thống kê</Text>
                            <Text style={styles.buttonTextSubTitle}>Phân tích dữ liệu cá nhân</Text>
                        </View>
                        <Image source={assets.image.right_ios} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (userInformation?.type === "pro") {
                            toast.info("Cảnh báo", "Bạn đã đăng ký gói premium rồi");
                            return;
                        }
                        router.push('/(profile)/premium');
                    }}>
                        <Image source={assets.image.money} style={{ width: 24, height: 24, marginRight: 8 }} />
                        <View style={styles.buttonTextWrapper}>
                            <Text style={styles.buttonTextTitle}>Đăng ký</Text>
                            <Text style={styles.buttonTextSubTitle}>Premium</Text>
                        </View>
                        <Image source={assets.image.right_ios} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
                <Horizontal color="#D9D9D9" height={1} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    informationWrapper: {
        marginTop: 35,
        alignItems: 'center',
        paddingHorizontal: 30
    },

    title: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 24,
        color: '#342E2E',
        alignSelf: 'flex-start'
    },

    avatar: {
        width: screen.width / 2.3,
        height: screen.width / 2.3,
        borderRadius: screen.width,
        marginBlock: 15
    },

    name: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 24,
        color: '#342E2E',
    },

    centerInformationWrapper: {
        backgroundColor: '#19A1CB',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBlock: 10
    },

    information: {
        gap: 5,
        flex: 1,
        alignItems: 'center'
    },

    informationText: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: 'white'
    },

    informationValue: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: 'white'
    },

    button: {
        paddingBlock: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },

    buttonTextWrapper: {
        flex: 1
    },

    buttonTextTitle: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#8A8A8A'
    },

    buttonTextSubTitle: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#8A8A8A'
    }
});