import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import Horizontal from "@/components/Horizontal";
import BaseInput from "@/components/Inputs/base-input";
import { auth } from "@/lib/firebase-config";
import screen from "@/utils/screen";
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Formik } from 'formik';
import { toast } from "@/utils";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//     webClientId: '779217320193-mh8remlf4ah3bhnu2k9fser55frp48gk.apps.googleusercontent.com',
//     offlineAccess: true, // Lấy refresh token để duy trì đăng nhập
//     forceCodeForRefreshToken: true, // Bắt buộc lấy authorization code thay vì chỉ access token
//     scopes: ['email', 'profile'], // Quyền truy cập email và profile của user
// });

export default function LoginScreen() {
    const [errorState, setErrorState] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: { email: string, password: string }) => {
        const { email, password } = values;

        // Check email
        if (!email) {
            toast.error("Lỗi", "Email không được để trống");
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            toast.error("Lỗi", "Email không hợp lệ");
            return;
        }

        // Check password
        if (!password) {
            toast.error("Lỗi", "Mật khẩu không được để trống");
            return;
        } else if (password.length < 6) {
            toast.error("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password).catch((error) => {
            setErrorState(error.message);
            toast.error("Lỗi đăng nhập", "Vui lòng kiểm tra lại thông tin đăng nhập.");
        }
        ).finally(() => setLoading(false));
    };

    // const handleLoginByGoogle = async () => {
    //     // // Check if your device supports Google Play
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //     // // Get the users ID token
    //     const sInfo = await GoogleSignin.signIn();

    //     // console.log('====================================');
    //     // console.log("sInfo ", sInfo);
    //     // console.log('====================================');

    //     // // Create a Google credential with the token
    //     const googleCredential = GoogleAuthProvider.credential(sInfo.data?.idToken);

    //     // // Sign-in the user with the credential
    //     await signInWithCredential(auth, googleCredential);
    // }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <Image source={assets.image.logo} style={styles.logo} />

                <Text style={styles.textLogo}>Jog Journey</Text>

                <Text style={styles.loginText}>Đăng nhập</Text>
                <Text style={styles.welcomeText}>Chào mừng!</Text>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={handleLogin}
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
                                    placeholder="Email"
                                    placeholderTextColor="#8A8A8A"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    autoFocus
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                />
                                <BaseInput
                                    leftIcon={<Image source={assets.image.lock} style={{ width: 24, height: 24 }} />}
                                    placeholder="Mật khẩu"
                                    placeholderTextColor="#8A8A8A"
                                    rightIcon={<Image source={assets.image.visibility_off} style={{ width: 24, height: 24 }} />}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={values.password}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                />
                                <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
                            </View>

                            <BaseButton loading={loading} title="Đăng nhập" onPress={handleSubmit} />
                        </>
                    )}
                </Formik>

                <Horizontal height={1} color="#8A8A8A" styles={{ marginBlock: 20, width: '95%' }} />

                <View style={{ gap: 15, width: '100%' }}>
                    <BaseButton
                        leftIcon={<Image source={assets.image.facebook} style={{ width: 24, height: 24 }} />}
                        title="Tài khoản Facebook"
                        viewStyle={{ flex: 1 }}
                        onPress={() => { }}
                    />
                    <BaseButton
                        leftIcon={<Image source={assets.image.google} style={{ width: 24, height: 24 }} />}
                        title="Tài khoản Google"
                        buttonStyle={{ backgroundColor: '#F5F5F5' }}
                        titleStyle={{ color: '#595050' }}
                        onPress={() => {}}
                        viewStyle={{ flex: 1 }}
                    />
                </View>

                <View style={styles.endWrapper}>
                    <Text style={styles.forgotPassText}>Bạn chưa có tài khoản?</Text>
                    <Link
                        style={[styles.forgotPassText, { fontWeight: 'bold', textDecorationLine: 'underline', marginLeft: 10 }]}
                        href="/(auth)/register"
                    >
                        Đăng ký
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 40
    },

    logo: {
        width: screen.width / 3.5,
        height: screen.width / 3.5,
    },

    textLogo: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 32,
        color: '#07476D',
        marginTop: 10,
        marginBottom: 15
    },

    loginText: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 24,
        color: 'black',
        marginBottom: 5
    },

    welcomeText: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#8A8A8A'
    },

    inputWrapper: {
        marginTop: 10,
        marginBottom: 20
    },

    forgotPassText: {
        textAlign: 'right',
        fontWeight: 'regular',
        fontSize: 15,
        fontFamily: 'Inter',
        color: '#8A8A8A'
    },

    endWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 20
    }
})