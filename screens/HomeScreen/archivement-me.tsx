import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import Horizontal from "@/components/Horizontal";
import { fetchExerciseById } from "@/helpers/api";
import { formatTimeAndDay, getAchievementStatusName } from "@/utils";
import screen from "@/utils/screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { Shadow } from "react-native-shadow-2";

interface ArchivementMeProps {
    onChangePage: () => void;
    userInformation: any;
    achivements: any[];
    highestPoint: number;
    pointsGained: number;
}

const AchievementItem = ({ item }: { item: any }) => {
    const [exercise, setExercise] = useState<any>(null);

    useEffect(() => {
        if (item?.excerciseId) {
            fetchExerciseById(item?.excerciseId).then(setExercise);
        }
    }, [item?.excerciseId]);

    return (
        <View style={{ backgroundColor: 'white', paddingVertical: 2, paddingHorizontal: 10 }}>
            <Text style={styles.extraText}>{formatTimeAndDay(item?.createdAt, 'shortDateTime')}</Text>
            <Horizontal height={1} color="#D9D9D9" />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 }}>
                <MaterialIcons name={exercise?.icon || 'directions-run'} size={44} color='#1C1B1F' />
                <View style={{ flex: 1 }}>
                    <Text style={styles.listText}>{item?.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.listStatus}>{getAchievementStatusName(item?.status)}</Text>
                        <Text style={[styles.extraText, { color: '#19A1CB' }]}>{item?.status === 3 ? `+${exercise?.score ?? 0}` : 0}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const ArchivementMe: React.FC<ArchivementMeProps> = ({ onChangePage, userInformation, achivements, highestPoint, pointsGained }) => {

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Shadow>
                    <Image source={userInformation?.avatar ? { uri: userInformation.avatar } : assets.image.avatar} style={styles.avatar} />
                </Shadow>
                <View style={{ width: '50%' }}>
                    <Text style={styles.title}>Điểm:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.mainScore}>{userInformation?.totalPoints ?? 0}</Text>
                        <BaseButton
                            title="Đổi điểm"
                            onPress={onChangePage}
                            buttonStyle={{ alignSelf: 'flex-start', width: 'auto', paddingBlock: 4, paddingHorizontal: 8 }}
                            titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                            viewStyle={{ alignSelf: 'flex-start' }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                        <View>
                            <Text style={styles.extraText}>Điểm cao NH</Text>
                            <Text style={styles.extraScore}>{highestPoint}</Text>
                        </View>
                        <View>
                            <Text style={styles.extraText}>Điểm hôm nay</Text>
                            <Text style={styles.extraScore}>{pointsGained > 0 ? `+${pointsGained}` : 0}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                data={achivements}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <AchievementItem item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingBlock: 10, paddingHorizontal: 30 }}
            />
        </View>
    )
}

export default ArchivementMe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    avatar: {
        width: 89,
        height: 89,
        borderRadius: screen.width
    },

    card: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBlock: 20,
        backgroundColor: 'white',
        gap: 15
    },

    title: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#342E2E'
    },

    mainScore: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#19A1CB'
    },

    extraText: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#8A8A8A'
    },

    extraScore: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#8A8A8A'
    },

    listText: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#342E2E',
        marginBottom: 10
    },

    listStatus: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#23B238'
    }
})