import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import BaseInput from "@/components/Inputs/base-input";
import { auth } from "@/lib/firebase-config";
import { toast } from "@/utils";
import screen from "@/utils/screen";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen() {
    const [errorState, setErrorState] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values: { email: string, password: string, confirmPassword: string }) => {
        const { email, password, confirmPassword } = values;

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

        // Check confirm password
        if (!confirmPassword) {
            toast.error("Lỗi", "Xác nhận mật khẩu không được để trống");
            return;
        } else if (confirmPassword.length < 6) {
            toast.error("Lỗi", "Xác nhận mật khẩu phải có ít nhất 6 ký tự");
            return;
        } else if (password !== confirmPassword) {
            toast.error("Lỗi", "Mật khẩu không trùng khớp");
            return;
        }

        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password).then((res) => {
            toast.success('Đăng ký thành công', 'Chuyển hướng đến trang đăng nhập.');
            router.push('/(auth)/login');
        })
            .catch((error) => {
                setErrorState(error.message);
                toast.error("Lỗi đăng ký", "Vui lòng kiểm tra lại thông tin đăng ký.");
            }
            ).finally(() => setLoading(false));
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <Image source={assets.image.logo} style={styles.logo} />

                <Text style={styles.textLogo}>Jog Journey</Text>

                <Text style={styles.loginText}>Tạo tài khoản</Text>
                <Text style={styles.welcomeText}>Đăng ký!</Text>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={handleRegister}
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
                                    autoFocus={true}
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
                                    secureTextEntry={true}
                                    textContentType="password"
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                />
                                <BaseInput
                                    leftIcon={<Image source={assets.image.lock} style={{ width: 24, height: 24 }} />}
                                    placeholder="Xác nhận mật khẩu"
                                    placeholderTextColor="#8A8A8A"
                                    rightIcon={<Image source={assets.image.visibility_off} style={{ width: 24, height: 24 }} />}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    textContentType="password"
                                    value={values.confirmPassword}
                                    onChangeText={handleChange("confirmPassword")}
                                    onBlur={handleBlur("confirmPassword")}
                                />
                            </View>

                            <BaseButton loading={loading} title="Đăng ký" onPress={handleSubmit} />
                        </>
                    )}
                </Formik>

                <View style={styles.endWrapper}>
                    <Text style={styles.forgotPassText}>Bạn đã có tài khoản?</Text>
                    <Link
                        href="/(auth)/login"
                        style={[styles.forgotPassText, { fontWeight: 'bold', textDecorationLine: 'underline', marginLeft: 10 }]}
                    >
                        Đăng nhập
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
        marginBottom: 20,
        gap: 15
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