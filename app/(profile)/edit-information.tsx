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
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "@/helpers/api"
import Loading from "@/components/Loadings/loading"
import BaseSelect from "@/components/Selects/base-select"

const EditInformationScreen: React.FC = () => {
    const { userInformation, setUserInformation } = useAuth();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState(userInformation?.avatar);

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
            fullname, gender, birthday, height, weight, avatar: image
        }).then(() => {
            const updatedData = {
                ...userInformation, // Gộp thông tin từ Firestore
                fullname,
                birthday,
                gender,
                height,
                weight,
                avatar: image
            };
            setUserInformation(updatedData);
            setValues(values);
            toast.success("Cập nhập thành công", "Đã hoàn thành!");
        }).finally(() => setLoading(false));
    };

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
                            source={image ? { uri: image } : assets.image.avatar}
                            style={styles.avatar}
                        />
                        {/* Nút camera */}
                        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                            <Image source={assets.image.camera} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                        {imageLoading && <Loading size={50} viewStyle={{ borderRadius: screen.width }} />}
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
                                    <BaseSelect
                                        leftIcon={<Image source={assets.image.gender} style={{ width: 24, height: 24 }} />}
                                        data={[{ value: 'Nam', label: 'Nam' }, { value: 'Nữ', label: 'Nữ' }, { value: 'Khác', label: 'Khác' }]}
                                        selected={values.gender}
                                        placeHolderText="Giới tính"
                                        onSelect={handleChange("gender")}
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
        marginBlock: 25,
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
});