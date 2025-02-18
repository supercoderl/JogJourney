import assets from '@/assets';
import { auth } from '@/lib/firebase-config';
import { useAuth } from '@/providers';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default () => {
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth,
            (authenticatedUser) => {
                setTimeout(() => {
                    if (authenticatedUser) {
                        setUser(authenticatedUser);
                        router.push('/(home)');
                    }
                    else {
                        setUser(null);
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
