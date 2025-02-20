import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

export default function RecordScreen() {
    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                rightIcon={
                    <TouchableOpacity onPress={() => {}}>
                        <Image source={assets.image.cloudy} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
});