import assets from "@/assets";
import Header from "@/components/Headers/header-home";
import TopTabs from "@/components/Tabs/top-tab";
import ArchivementMe from "@/screens/HomeScreen/archivement-me";
import Competition from "@/screens/HomeScreen/competition";
import ExchangePoint from "@/screens/HomeScreen/exchange-point";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
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

    const handleTabChange = (index: number) => {
        setPageIndex(index);
        pagerRef.current?.setPage(index); // Chuyển trang khi bấm tab
    };

    return (
        <View style={styles.container}>
            <Header />

            <TopTabs tabs={tabs} onTabChange={handleTabChange} pageIndex={pageIndex} />
            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}
            >
                <View key="1" style={[styles.page]}>
                    <ArchivementMe onChangePage={() => handleTabChange(2)} />
                </View>
                <View key="2" style={styles.page}>
                    <Competition />
                </View>
                <View key="3" style={[styles.page, { paddingTop: 10 }]}>
                    <ExchangePoint />
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