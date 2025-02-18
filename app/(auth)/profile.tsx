import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import BaseInput from "@/components/Inputs/base-input";
import screen from "@/utils/screen";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tạo hồ sơ</Text>
            <Text style={styles.subTitle}>Hồ sơ là nơi lưu trữ các hoạt động của bạn và cách bạn bè tìm thấy bạn trong Jog Journey.</Text>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={assets.image.avatar}
                    style={styles.avatar}
                />
                {/* Nút camera */}
                <TouchableOpacity style={styles.cameraButton}>
                    <Image source={assets.image.camera} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
                <BaseInput
                    leftIcon={<Image source={assets.image.account_circle} style={{ width: 24, height: 24 }} />}
                    placeholder="Email"
                    placeholderTextColor="#8A8A8A"
                />
                <BaseInput
                    leftIcon={<Image source={assets.image.celebration} style={{ width: 24, height: 24 }} />}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#8A8A8A"
                />
                <BaseInput
                    leftIcon={<Image source={assets.image.gender} style={{ width: 24, height: 24 }} />}
                    placeholder="Xác nhận mật khẩu"
                    placeholderTextColor="#8A8A8A"
                />
                <BaseInput
                    leftIcon={<Image source={assets.image.height} style={{ width: 24, height: 24 }} />}
                    placeholder="Xác nhận mật khẩu"
                    placeholderTextColor="#8A8A8A"
                />
                <BaseInput
                    leftIcon={<Image source={assets.image.weight} style={{ width: 24, height: 24 }} />}
                    placeholder="Xác nhận mật khẩu"
                    placeholderTextColor="#8A8A8A"
                />
            </View>

            <BaseButton title="Tiếp tục" onPress={() => {}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingBlock: 50,
        alignItems: 'center'
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 24,
        color: 'black',
        alignSelf: 'flex-start'
    },

    subTitle: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#8A8A8A'
    },

    avatarContainer: {
        position: 'relative',
        marginBlock: 25
    },
    avatar: {
        width: screen.width / 2.3,
        height: screen.width / 2.3,
        borderRadius: screen.width,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: '5%',
    },
    inputWrapper: {
        marginTop: 10,
        marginBottom: 20,
        gap: 15
    },
})