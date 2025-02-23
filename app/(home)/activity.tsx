import Header from "@/components/Headers/header-home";
import Horizontal from "@/components/Horizontal";
import ExerciseHint from "@/screens/HomeScreen/activity/exercise-hint";
import ExerciseSelection from "@/screens/HomeScreen/activity/exercise-selection";
import WeatherActivity from "@/screens/HomeScreen/activity/weather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";

export default function ActivityScreen() {
    return (
        <View style={styles.container}>
            <Header
                leftIcon={<View />}
                rightIcon={
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <TouchableOpacity onPress={() => router.push('/(profile)/edit-information')}>
                            <MaterialCommunityIcons name="chart-bar" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(profile)/setting')}>
                            <MaterialCommunityIcons name="bell-badge-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                }
            />

            <ScrollView style={{ gap: 10 }}>
                <WeatherActivity />

                <Horizontal height={10} color="rgba(0, 0, 0, 0.03)" />

                <ExerciseSelection />

                <Horizontal height={10} color="rgba(0, 0, 0, 0.03)" />

                <ExerciseHint />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});