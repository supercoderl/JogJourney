import assets from "@/assets"
import BaseButton from "@/components/Buttons/base-button"
import Header from "@/components/Headers/header-home"
import BaseInput from "@/components/Inputs/base-input"
import { firestore } from "@/lib/firebase-config"
import { useAuth } from "@/providers"
import { toast } from "@/utils"
import screen from "@/utils/screen"
import { doc, updateDoc } from "@firebase/firestore"
import { router } from "expo-router"
import { Formik, FormikHelpers } from "formik"
import React, { useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const EditInformationScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { userInformation, setUserInformation } = useAuth();

    const handleSubmit = async (
        values: { fullname: string; birthday: string; gender: string; height: string; weight: string; },
        { setValues }: FormikHelpers<{ fullname: string; birthday: string; gender: string; height: string; weight: string; }>
    ) => {
        if (!userInformation) {
            toast.error("Lỗi xác thực", "Vui lòng đăng nhập lại!");
            router.push('/(auth)/login');
            return;
        }

        const { fullname, birthday, gender, height, weight } = values;

        // Check email
        if (!fullname || !birthday || !gender || !height || !weight) {
            toast.error("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        setLoading(true);

        const userRef = doc(firestore, "informations", userInformation.userId);
        await updateDoc(userRef, {
            fullname, gender, birthday, height, weight
        }).then(() => {
            const updatedData = {
                ...userInformation, // Gộp thông tin từ Firestore
                fullname,
                birthday,
                gender,
                height,
                weight
            };
            setUserInformation(updatedData);
            setValues(values);
            toast.success("Cập nhập thành công", "Đã hoàn thành!");
        }).finally(() => setLoading(false));
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
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
                    <Text style={styles.title}>Chỉnh sửa thông tin</Text>
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

                    <Formik<{ fullname: string; birthday: string; gender: string; height: string; weight: string; }>
                        initialValues={{
                            fullname: userInformation?.fullname ?? '',
                            birthday: userInformation?.birthday ?? '',
                            gender: userInformation?.gender ?? '',
                            height: String(userInformation?.height) ?? '',
                            weight: String(userInformation?.weight) ?? '',
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur
                        }) => (
                            <>
                                <View style={styles.inputWrapper}>
                                    <BaseInput
                                        leftIcon={<Image source={assets.image.account_circle} style={{ width: 24, height: 24 }} />}
                                        placeholder="Họ và tên"
                                        placeholderTextColor="#8A8A8A"
                                        autoCapitalize="none"
                                        autoFocus={true}
                                        value={values.fullname}
                                        onChangeText={handleChange("fullname")}
                                        onBlur={handleBlur("fullname")}
                                    />
                                    <BaseInput
                                        leftIcon={<Image source={assets.image.celebration} style={{ width: 24, height: 24 }} />}
                                        placeholder="Ngày sinh"
                                        placeholderTextColor="#8A8A8A"
                                        autoCapitalize="none"
                                        value={values.birthday}
                                        onChangeText={handleChange("birthday")}
                                        onBlur={handleBlur("birthday")}
                                    />
                                    <BaseInput
                                        leftIcon={<Image source={assets.image.gender} style={{ width: 24, height: 24 }} />}
                                        placeholder="Giới tính"
                                        placeholderTextColor="#8A8A8A"
                                        autoCapitalize="none"
                                        value={values.gender}
                                        onChangeText={handleChange("gender")}
                                        onBlur={handleBlur("gender")}
                                    />
                                    <BaseInput
                                        leftIcon={<Image source={assets.image.height} style={{ width: 24, height: 24 }} />}
                                        placeholder="Chiều cao"
                                        placeholderTextColor="#8A8A8A"
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                        value={values.height}
                                        onChangeText={handleChange("height")}
                                        onBlur={handleBlur("height")}
                                    />
                                    <BaseInput
                                        leftIcon={<Image source={assets.image.weight} style={{ width: 24, height: 24 }} />}
                                        placeholder="Cân nặng"
                                        placeholderTextColor="#8A8A8A"
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                        value={values.weight}
                                        onChangeText={handleChange("weight")}
                                        onBlur={handleBlur("weight")}
                                    />
                                </View>

                                <BaseButton loading={loading} title="Lưu chỉnh sửa" onPress={handleSubmit} />
                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default EditInformationScreen;

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
});