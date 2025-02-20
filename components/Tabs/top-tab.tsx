import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

interface TopTabsProps {
    onTabChange: (tab: number) => void;
    pageIndex: number;
    tabs: { key: number, title: string, icon: any }[];
}

const TopTabs: React.FC<TopTabsProps> = ({ onTabChange, pageIndex, tabs }) => {
    return (
        <View style={styles.container}>
            {
                tabs.map((item) => (
                    <TouchableOpacity
                        style={[styles.item, pageIndex === item.key && { backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#19A1CB' }]}
                        onPress={() => onTabChange(item.key)}
                        key={item.key}
                    >
                        <Image source={item.icon} style={{ width: 24, height: 24 }} />
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View >
    );
}

export default TopTabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%'
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flex: 1,
        height: 50,
        backgroundColor: '#D9D9D9'
    }
})