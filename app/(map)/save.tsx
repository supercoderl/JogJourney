import assets from "@/assets"
import BaseButton from "@/components/Buttons/base-button"
import Header from "@/components/Headers/header-home"
import Loading from "@/components/Loadings/loading"
import { getChallengesByUser, getLevels, getMaps } from "@/helpers/api"
import { useAuth } from "@/providers"
import { formatTimeAndDay } from "@/utils"
import { filterMap, getExcerciseName, getLevelName } from "@/utils/filter"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View, Image, Text, FlatList } from "react-native"
import { Shadow } from 'react-native-shadow-2';

const SaveScreen: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [challenges, setChallenges] = useState<any[]>([]);
    const [levels, setLevels] = useState<any[]>([]);
    const [maps, setMaps] = useState<any[]>([]);

    const getChallenges = async () => {
        setLoading(true);

        try {
            const [challengesData, levelsData, mapsData] = await Promise.all([
                getChallengesByUser(user.uid),
                getLevels(),
                getMaps()
            ]);

            setChallenges(challengesData);
            setLevels(levelsData);
            setMaps(mapsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            getChallenges();
        }
    }, []);

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

            <View style={{ flex: 1 }}>
                <FlatList
                    data={challenges}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Shadow style={styles.card}>
                            <View>
                                <Text style={styles.title}>{getExcerciseName(item?.excerciseId ?? 0).name} {getLevelName(levels, item?.levelId)}</Text>
                                <Text style={styles.text}>{filterMap(maps, item?.mapId)?.name ?? 'Công viên'}</Text>
                                <Text style={styles.text}>{formatTimeAndDay(item?.completedAt ?? new Date(), 'dateTime12h')}</Text>
                            </View>

                            <View style={[styles.imageContainer, { backgroundColor: getExcerciseName(item?.excerciseId ?? 0).color }]}>
                                <Image
                                    source={getExcerciseName(item?.excerciseId ?? 0).image}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </View>
                        </Shadow>
                    )}
                    contentContainerStyle={{ paddingBlock: 20, paddingHorizontal: 10, gap: 30 }}
                />
                {loading && <Loading size={40} />}
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