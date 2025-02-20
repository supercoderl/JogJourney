import assets from "@/assets"
import BaseButton from "@/components/Buttons/base-button"
import Header from "@/components/Headers/header-home"
import screen from "@/utils/screen"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, TouchableOpacity, View, Image, Text, FlatList } from "react-native"
import { Shadow } from 'react-native-shadow-2';

const SaveScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontSize: 24, color: 'white' }}>Bản lưu</Text>}
                rightIcon={<View />}
            />

            <FlatList
                data={[1, 2]}
                keyExtractor={(item) => item.toString()}
                renderItem={() => (
                    <Shadow style={styles.card}>
                        <View>
                            <Text style={styles.title}>Chạy bộ 1</Text>
                            <Text style={styles.text}>Công viên Gia Định</Text>
                            <Text style={styles.text}>10/11/2024 - 9:00 am</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={assets.image.running} style={{ width: 74, height: 105.67 }} />
                        </View>
                    </Shadow>
                )}
                contentContainerStyle={{ paddingBlock: 20, paddingHorizontal: 10, gap: 30 }}
            />

            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
            }}>
                <BaseButton
                    title="Trang chủ"
                    onPress={() => router.push('/(home)')}
                    buttonStyle={{
                        borderRadius: 0,
                        height: 66
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
                />
            </View>
        </View>
    )
}

export default SaveScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    contentContainer: {
        paddingHorizontal: 15,
        paddingTop: 40
    },

    imageContainer: {
        width: 116,
        height: 116,
        backgroundColor: 'rgba(35,178,56,0.59)',
        borderRadius: 15,
        paddingBlock: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 15,
        paddingBlock: 10,
        paddingHorizontal: 15
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: 'black',
        marginBottom: 15
    },

    text: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#19A1CB'
    }
});