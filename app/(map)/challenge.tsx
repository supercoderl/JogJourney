import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import { router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, Modal } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Ionicons from "@expo/vector-icons/Ionicons";
import BaseButton from "@/components/Buttons/base-button";
import screen from "@/utils/screen";

const Tab = () => {
    return (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', paddingTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 5, zIndex: 2 }}>
                <Shadow distance={1} offset={[3, -3]} startColor="rgba(0, 0, 0, 0.05)">
                    <TouchableOpacity style={{ paddingBlock: 6, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 8 }}>
                        <Ionicons name="walk" size={38} />
                    </TouchableOpacity>
                </Shadow>
                <Shadow distance={1} offset={[3, -3]} startColor="rgba(0, 0, 0, 0.05)">
                    <TouchableOpacity style={{ paddingBlock: 6, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#E0E0E0' }}>
                        <Ionicons name="bicycle-sharp" size={38} color="#9DC08B" />
                    </TouchableOpacity>
                </Shadow>
            </View>
        </View>
    )
}


const ChallengeScreen: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                children={<Text style={{ fontSize: 24, color: 'white' }}>Thử thách</Text>}
                rightIcon={<View />}
            />

            <View style={{ backgroundColor: 'white', width: '100%', height: 80 }} />

            <Tab />

            <View style={{ paddingBlock: 60, backgroundColor: 'white', gap: 30 }}>
                <BaseButton
                    title="Người tham gia 1 - Beginer"
                    leftIcon={
                        <Ionicons name="walk" size={45} color="white" />
                    }
                    buttonStyle={styles.button}
                    onPress={() => setShowModal(true)}
                />

                <BaseButton
                    title="Người tham gia 2 - Beginer"
                    leftIcon={
                        <Ionicons name="walk" size={45} color="white" />
                    }
                    buttonStyle={styles.button}
                    onPress={() => { }}
                />

                <BaseButton
                    title="Người tham gia 3 - Advanced"
                    leftIcon={
                        <Ionicons name="walk" size={45} color="white" />
                    }
                    buttonStyle={styles.button}
                    onPress={() => { }}
                />
            </View>

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

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.center}>
                    <View style={{ backgroundColor: '#19A1CB', paddingBlock: 30, width: '100%', alignItems: 'center' }}>
                        <Text style={styles.modalTitle}>Thử thách với người này ?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <TouchableOpacity style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ChallengeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    button: {
        paddingBlock: 15,
        borderRadius: 0,
        justifyContent: 'flex-start',
        gap: screen.width * 0.12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },

    modalTitle: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 36,
        color: 'white',
        textAlign: 'center',
        width: '80%',
        lineHeight: 38
    },

    modalButton: {
        paddingBlock: 6,
        paddingHorizontal: 25,
        backgroundColor: 'white',
        marginTop: 40
    },

    modalButtonText: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#19A1CB'
    }
});