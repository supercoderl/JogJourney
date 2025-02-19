import assets from '@/assets';
import { auth, firestore } from '@/lib/firebase-config';
import { useAuth } from '@/providers';
import { doc, getDoc } from '@firebase/firestore';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default () => {
    const { setUser, setUserInformation, user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const checkIsInformationExists = async (id: string) => {
        const docRef = doc(firestore, 'informations', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data(); // Trả về dữ liệu document
        } else {
            return null;
        }
    }

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth,
            (authenticatedUser) => {
                setTimeout(async () => {
                    if (authenticatedUser) {
                        setUser(authenticatedUser);
                        const information = await checkIsInformationExists(authenticatedUser.uid);
                        if (information) {
                            const combinedUserData = {
                                userId: authenticatedUser.uid,
                                email: authenticatedUser.email,
                                displayName: authenticatedUser.displayName,
                                photoURL: authenticatedUser.photoURL,
                                ...information, // Gộp thông tin từ Firestore
                            };

                            setUserInformation(combinedUserData); // Lưu object kết hợp vào state
                            router.push('/(home)');
                        }
                        else {
                            router.push('/(auth)/profile');
                        }
                    }
                    else {
                        setUser(null);
                        setUserInformation(null);
                        router.push('/(auth)/login');
                    }
                    setIsLoading(false);
                }, 500);
            }
        );

        // unsubscribe auth listener on unmount
        return unsubscribeAuthStateChanged;
    }, [user]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <ImageBackground
                        source={assets.image.background}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    background: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover'
    }
})
