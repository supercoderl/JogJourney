import assets from "@/assets"
import screen from "@/utils/screen"
import React from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const ProposeItem = () => {
    return (
        <View style={styles.proposeItemWrapper}>
            <Image source={assets.image.account_box} style={styles.account_box} />
            <View>
                <Text style={styles.name}>Lê Vân Triều</Text>
                <Text style={styles.follower}>22 người theo dõi</Text>
                <TouchableOpacity style={styles.followButton}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const FollowerList = () => {
    return (
        <View style={styles.followerContainer}>
            <View style={{ flexDirection: 'row', gap: 10, flex: 1, alignItems: 'center', paddingLeft: 30 }}>
                <Image source={assets.image.avatar} style={styles.avatar} />
                <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 16, color: '#342E2E' }}>Dương Kha</Text>
            </View>
            <TouchableOpacity>
                <Image source={assets.image.right} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
        </View>
    )
}

const Propose: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Đề xuất</Text>
            </View>

            <View>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={() => <ProposeItem />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingVertical: 10, alignItems: 'flex-start' }}
                    horizontal
                />
            </View>

            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Đã theo dõi</Text>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={() => <FollowerList />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
        </View>
    )
}

export default Propose;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    },

    titleWrapper: {
        backgroundColor: '#19A1CB',
        paddingHorizontal: 30
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 24,
        color: 'white'
    },

    account_box: {
        width: 102,
        height: 102
    },

    proposeItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'white',
        height: 119,
    },

    name: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#342E2E'
    },

    follower: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#19A1CB',
        marginBottom: 8
    },

    followButton: {
        width: 107,
        borderRadius: 10,
        backgroundColor: '#19A1CB',
        paddingBlock: 5
    },

    followerContainer: {
        paddingBlock: 15,
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 5,
        borderBottomColor: '#D9D9D9',
        backgroundColor: 'white'
    },

    avatar: {
        width: 40,
        height: 40
    }
})