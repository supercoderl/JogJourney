import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import TopTabs from "@/components/Tabs/top-tab";
import { getMyAchievements, getTodayPoints, getUsers } from "@/helpers/api";
import { useAuth } from "@/providers";
import ArchivementMe from "@/screens/HomeScreen/archivement-me";
import Competition from "@/screens/HomeScreen/competition";
import ExchangePoint from "@/screens/HomeScreen/exchange-point";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

const tabs = [
    {
        key: 0,
        title: 'Cá nhân',
        icon: assets.image.person
    },
    {
        key: 1,
        title: 'Cạnh tranh',
        icon: assets.image.group
    },
    {
        key: 2,
        title: 'Đổi điểm',
        icon: assets.image.gift
    }
]

export default function ActivityScreen() {
    const pagerRef = useRef<PagerView>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const { userInformation, setUserInformation } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [achivements, setAchievements] = useState<any[]>([]);
    const [pointsGained, setPointsGained] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleTabChange = (index: number) => {
        setPageIndex(index);
        pagerRef.current?.setPage(index); // Chuyển trang khi bấm tab
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [achievementsData, usersData, point] = await Promise.all([
                getMyAchievements(userInformation.userId),
                getUsers(),
                getTodayPoints(userInformation.userId)
            ]);

            setAchievements(achievementsData);
            setUsers(usersData);
            setPointsGained(point ?? 0);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInformation?.userId) {
            fetchData();
        }
    }, [userInformation]);

    return (
        <View style={styles.container}>
            <Header
                rightIcon={
                    <TouchableOpacity onPress={fetchData}>
                        <MaterialCommunityIcons name='reload' size={24} color="white" />
                    </TouchableOpacity>
                }
            />

            <TopTabs tabs={tabs} onTabChange={handleTabChange} pageIndex={pageIndex} />
            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}
            >
                <View key="1" style={[styles.page]}>
                    <ArchivementMe
                        userInformation={userInformation}
                        onChangePage={() => handleTabChange(2)}
                        achivements={achivements}
                        highestPoint={users.reduce((max, user) => {
                            const points = user?.totalPoints ?? 0;
                            return isNaN(points) ? max : Math.max(max, points);
                        }, 0)}
                        pointsGained={pointsGained}
                        loading={loading}
                    />
                </View>
                <View key="2" style={styles.page}>
                    <Competition
                        users={[...users].sort((a, b) => (b?.totalPoints ?? 0) - (a?.totalPoints ?? 0))}
                        pointsGained={pointsGained}
                    />
                </View>
                <View key="3" style={[styles.page, { paddingTop: 10 }]}>
                    <ExchangePoint
                        userInformation={userInformation}
                        setUserInformation={setUserInformation}
                    />
                </View>
            </PagerView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    page: {
        width: '100%',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#c1c3c7'
    }
});