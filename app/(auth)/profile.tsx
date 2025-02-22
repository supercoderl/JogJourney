import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import BaseInput from "@/components/Inputs/base-input";
import Loading from "@/components/Loadings/loading";
import { firestore } from "@/lib/firebase-config";
import { useAuth } from "@/providers";
import { toast } from "@/utils";
import screen from "@/utils/screen";
import { doc, setDoc } from "@firebase/firestore";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "@/helpers/api"

export default function ProfileScreen() {
    const { user, userInformation, setUserInformation } = useAuth();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState(null);

    const handleSubmit = async (values: { fullname: string, birthday: string, gender: string, height: string, weight: string }) => {
        if (!user) {
            toast.error("Lỗi xác thực", "Vui lòng đăng nhập lại.");
            router.push('/(auth)/login');
        }

        const { fullname, birthday, gender, height, weight } = values;

        // Check fullname
        if (!fullname || !birthday || !gender || !height || !weight) {
            toast.error("Lỗi", "Hãy nhập đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        await setDoc(doc(firestore, 'informations', user?.uid), {
            fullname,
            birthday,
            gender,
            height: Number(height),
            weight: Number(weight),
            avatar: image
        }).then(() => {
            const updatedData = {
                ...userInformation, // Gộp thông tin từ Firestore
                fullname,
                birthday,
                gender,
                height: Number(height),
                weight: (weight),
                avatar: image
            };
            setUserInformation(updatedData);
            router.push('/(home)');
        }).catch((error: any) => {
            toast.error("Lỗi tạo thông tin", "Vui lòng kiểm tra lại thông tin và thử lại trong giây lát.");
        }).finally(() => setLoading(false));
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (result && result.assets && result.assets.length > 0) {
            let base64Img = `data:image/jpeg;base64,${result.assets[0]?.base64}`;

            setImageLoading(true);
            await uploadImage(base64Img).then((res) => {
                if (res && res.data) {
                    setImage(res.data.url);
                }
            }).catch((err) => console.log(err)).finally(() => setImageLoading(false));
        }

        if (!result.canceled) {

        }
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <Text style={styles.title}>Tạo hồ sơ</Text>
                <Text style={styles.subTitle}>Hồ sơ là nơi lưu trữ các hoạt động của bạn và cách bạn bè tìm thấy bạn trong Jog Journey.</Text>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Image
                        source={image ? { uri: image } : assets.image.avatar}
                        style={styles.avatar}
                    />
                    {/* Nút camera */}
                    <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                        <Image source={assets.image.camera} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    {imageLoading && <Loading size={50} viewStyle={{ borderRadius: screen.width }} />}
                </View>

                <Formik
                    initialValues={{
                        fullname: '',
                        birthday: '',
                        gender: '',
                        height: '',
                        weight: '',
                    }}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        touched,
                        errors,
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
                                    autoFocus
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
                                    placeholder="Chiều cao (cm)"
                                    placeholderTextColor="#8A8A8A"
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                    value={values.height}
                                    onChangeText={handleChange("height")}
                                    onBlur={handleBlur("height")}
                                />
                                <BaseInput
                                    leftIcon={<Image source={assets.image.weight} style={{ width: 24, height: 24 }} />}
                                    placeholder="Cân nặng (kg)"
                                    placeholderTextColor="#8A8A8A"
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                    value={values.weight}
                                    onChangeText={handleChange("weight")}
                                    onBlur={handleBlur("weight")}
                                />
                            </View>

                            <BaseButton
                                title="Tiếp tục"
                                onPress={handleSubmit}
                                loading={loading}
                            />
                        </>
                    )}
                </Formik>
            </View>
        </KeyboardAwareScrollView>
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
        zIndex: 2
    },
    inputWrapper: {
        marginTop: 10,
        marginBottom: 20,
        gap: 15
    },
})