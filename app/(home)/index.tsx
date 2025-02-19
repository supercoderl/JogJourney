import assets from '@/assets';
import Header from '@/components/Headers/header-home';
import TopTabs from '@/components/Tabs/top-tab';
import Connection from '@/screens/HomeScreen/connection';
import Me from '@/screens/HomeScreen/me';
import Propose from '@/screens/HomeScreen/propose';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import PagerView from "react-native-pager-view";

export default () => {
    const pagerRef = useRef<PagerView>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const handleTabChange = (index: number) => {
        setPageIndex(index);
        pagerRef.current?.setPage(index); // Chuyển trang khi bấm tab
    };

    return (
        <View style={styles.container}>
            <Header
                leftIcon={<Image source={assets.image.add} style={{ width: 24, height: 24 }} />}
                rightIcon={
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <TouchableOpacity>
                            <Image source={assets.image.search} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={assets.image.notification} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <TopTabs onTabChange={handleTabChange} pageIndex={pageIndex} />
            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}
            >
                <View key="1" style={[styles.page, { paddingTop: 10 }]}>
                    <Connection />
                </View>
                <View key="2" style={styles.page}>
                    <Propose />
                </View>
                <View key="3" style={[styles.page, { paddingTop: 10 }]}>
                    <Me />
                </View>
            </PagerView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    page: {
        width: '100%',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#c1c3c7'
    }
})
