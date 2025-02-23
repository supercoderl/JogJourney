import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, Modal, FlatList, RefreshControl } from "react-native";
import { Shadow } from "react-native-shadow-2";
import BaseButton from "@/components/Buttons/base-button";
import screen from "@/utils/screen";
import { getExercises, getLevels } from "@/helpers/api";
import Loading from "@/components/Loadings/loading";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Tab = ({
    exercises,
    selectedEx,
    onSelect
}: {
    exercises: any[],
    selectedEx: any,
    onSelect: (ex: any) => void
}) => {
    return (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', paddingTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <FlatList
                    data={exercises}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Shadow distance={1} offset={[3, -3]} startColor="rgba(0, 0, 0, 0.05)">
                            <TouchableOpacity style={{
                                paddingBlock: 6,
                                paddingHorizontal: 10,
                                backgroundColor: selectedEx && selectedEx.index === item.index ? 'white' : '#E0E0E0',
                                borderRadius: 8
                            }}
                                onPress={() => onSelect(item)}
                            >
                                <MaterialIcons
                                    name={item.icon ?? 'directions-run'}
                                    size={38}
                                    color={selectedEx && selectedEx.index === item.index ? 'black' : '#3D8D7A'}
                                />
                            </TouchableOpacity>
                        </Shadow>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 5 }}
                />
            </View>
        </View>
    )
}


const ChallengeScreen: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [levels, setLevels] = useState<any[]>([]);
    const [exercises, setExercises] = useState<any[]>([]);
    const [selectedEx, setSelectedEx] = useState<any>(null);
    const [selectedLevel, setSelectedLevel] = useState<any>(null);
    const map = useLocalSearchParams();

    const getLevelsAsync = async () => {
        setLoading(true);

        try {
            const [exercisesData, levelsData] = await Promise.all([
                getExercises(),
                getLevels(),
            ]);

            setLevels(levelsData);
            setExercises(exercisesData);

            if (exercisesData && exercisesData.length > 0) setSelectedEx(exercisesData[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLevelsAsync();
    }, []);

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

            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: '100%', height: 80 }} />

                <Tab
                    exercises={exercises}
                    selectedEx={selectedEx}
                    onSelect={setSelectedEx}
                />

                <View style={{ paddingBlock: 60, backgroundColor: 'white' }}>
                    <FlatList
                        data={levels}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <BaseButton
                                title={`Người tham gia ${index + 1} - ${item.name}`}
                                leftIcon={
                                    <MaterialIcons name={selectedEx ? selectedEx.icon : 'directions-run'} size={45} color="white" />
                                }
                                buttonStyle={styles.button}
                                onPress={() => {
                                    setShowModal(true);
                                    setSelectedLevel(item);
                                }}
                            />
                        )}
                        contentContainerStyle={{ gap: 30, width: '100%' }}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={getLevelsAsync}
                            />
                        }
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
                {loading && <Loading size={40} backgroundColor="white" />}
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
                            <TouchableOpacity style={styles.modalButton} onPress={() =>
                                router.push({ pathname: '/(map)/map-record', params: {
                                    map: JSON.stringify(map),
                                    level: JSON.stringify(selectedLevel),
                                    exercise: JSON.stringify(selectedEx)
                                } })
                            }>
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
        width: '100%',
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