/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import assets from '@/assets';
import Header from '@/components/Headers/header-home';
import { firestore } from '@/lib/firebase-config';
import { useAuth } from '@/providers';
import { toast } from '@/utils';
import screen from '@/utils/screen';
import { doc, updateDoc } from '@firebase/firestore';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
    ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function PaymentScreen() {
    const webViewRef = useRef(null);
    const { url } = useLocalSearchParams();
    const [isSuccess, setIsSuccess] = useState(false);

    const { userInformation, setUserInformation } = useAuth();

    // JavaScript để gửi dữ liệu từ WebView về React Native
    const injectedJavaScript = `
      window.addEventListener("message", function(event) {
        if (event.data && event.data.includes("vnp_TransactionStatus=00")) {
          window.ReactNativeWebView.postMessage("success");
        } else {
          window.ReactNativeWebView.postMessage("fail");
        }
      });
    `;

    const updateUserInformation = async () => {
        if (!userInformation) {
            toast.error("Lỗi xác thực", "Vui lòng đăng nhập lại!");
            router.push('/(auth)/login');
            return;
        }

        const userRef = doc(firestore, "informations", userInformation.userId);
        await updateDoc(userRef, { type: 'pro' }).then(() => {
            const updatedData = {
                ...userInformation, // Gộp thông tin từ Firestore
                type: 'pro'
            };
            setUserInformation(updatedData);
            setIsSuccess(true);
        });
    }

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

            {
                url ?
                    isSuccess ?
                        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={assets.image.success} style={{ width: screen.width / 1.4, height: screen.width / 1.4, alignSelf: 'center', marginBottom: 30 }} />
                            <Text style={{ fontSize: 24, textAlign: 'center', color: '#19A1CB', textTransform: 'uppercase' }}>Thanh toán</Text>
                            <Text style={{ fontSize: 24, textAlign: 'center', color: '#19A1CB', textTransform: 'uppercase' }}>Thành công</Text>
                        </View>
                        :
                        <WebView
                            ref={webViewRef}
                            source={{
                                uri: url as string,
                            }}
                            injectedJavaScript={injectedJavaScript}
                            onNavigationStateChange={(navState) => {
                                const { url } = navState;

                                // Kiểm tra URL có chứa "payment/callback" không
                                if (url.includes("payment/callback")) {
                                    const urlParams = new URL(url);
                                    const responseCode = urlParams.searchParams.get("vnp_ResponseCode");

                                    if (responseCode === "00") {
                                        // Gọi API cập nhật thông tin user
                                        updateUserInformation();
                                    } else {
                                        // Quay lại trang trước
                                        setIsSuccess(false);
                                    }
                                }
                            }}
                        />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={50} />
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
});