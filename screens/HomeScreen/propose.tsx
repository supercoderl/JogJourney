import assets from "@/assets"
import BaseButton from "@/components/Buttons/base-button"
import { firestore } from "@/lib/firebase-config"
import { useAuth } from "@/providers"
import { addDoc, collection, doc, getDocs, query, where } from "@firebase/firestore"
import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const ProposeItem = ({ user, userId, refreshFollowList }: { user: any, userId: string, refreshFollowList: () => void }) => {
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        setLoading(true);
        await addDoc(collection(firestore, 'follows'), {
            followerId: userId,
            followingId: user?.id,
            createdAt: new Date()
        }).then(() => refreshFollowList()).finally(() => setLoading(false));
    }

    return (
        <View style={styles.proposeItemWrapper}>
            <Image source={user?.avatar ? { uri: user?.avatar } : assets.image.account_box} style={styles.account_box} />
            <View>
                <Text style={styles.name}>{user?.fullname ?? 'Lê Vân Triều'}</Text>
                <Text style={styles.follower}>22 người theo dõi</Text>
                <BaseButton
                    title="Theo dõi"
                    onPress={handleFollow}
                    loading={loading}
                    buttonStyle={styles.followButton}
                    viewStyle={{ alignSelf: 'flex-start' }}
                    titleStyle={{ fontWeight: 'bold' }}
                />
            </View>
        </View>
    )
}

const FollowerList = ({ user }: { user: any }) => {
    return (
        <View style={styles.followerContainer}>
            <View style={{ flexDirection: 'row', gap: 10, flex: 1, alignItems: 'center', paddingLeft: 30 }}>
                <Image source={user?.avatar ? { uri: user?.avatar } : assets.image.avatar} style={styles.avatar} />
                <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 16, color: '#342E2E' }}>{user?.fullname ?? 'Dương Kha'}</Text>
            </View>
            <TouchableOpacity>
                <Image source={assets.image.right} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
        </View>
    )
}

const Propose: React.FC = () => {
    const { user } = useAuth();
    const [followedUsers, setFollowedUsers] = useState<any[]>([]);
    const [unFollowedUsers, setUnFollowedUsers] = useState<any[]>([]);

    // 1. Lấy tất cả user trừ chính bạn
    const getAllUsers = async () => {
        const querySnapshot = await getDocs(collection(firestore, "informations"));

        // Lọc danh sách để loại bỏ user hiện tại
        return querySnapshot.docs
            .filter(doc => doc.id !== user?.uid)
            .map(doc => ({ id: doc.id, ...doc.data() }));
    };

    // 2. Lấy danh sách người bạn đã follow
    const getFollowingList = async () => {
        const q = query(collection(firestore, "follows"), where("followerId", "==", user?.uid));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data().followingId);
    };

    // 3. Lọc danh sách user đã và chưa follow
    const getFollowStatus = async () => {
        const [allUsers, followingIds] = await Promise.all([
            getAllUsers(), // Lấy tất cả user
            getFollowingList(), // Lấy danh sách đã follow
        ]);

        // Lọc danh sách user đã follow
        const followedUsers = allUsers.filter(user => followingIds.includes(user.id));

        // Lọc danh sách user chưa follow
        const unfollowedUsers = allUsers.filter(user => !followingIds.includes(user.id));

        return { followedUsers, unfollowedUsers };
    };

    const refreshFollowList = async () => {
        const { followedUsers, unfollowedUsers } = await getFollowStatus();
        setFollowedUsers(followedUsers);
        setUnFollowedUsers(unfollowedUsers);
    };

    useEffect(() => {
        if (user) {
            getFollowStatus().then(({ followedUsers, unfollowedUsers }) => {
                setFollowedUsers(followedUsers);
                setUnFollowedUsers(unfollowedUsers);
            });
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Đề xuất</Text>
            </View>

            <View>
                <FlatList
                    data={unFollowedUsers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ProposeItem user={item} userId={user?.uid} refreshFollowList={refreshFollowList} />}
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
                    data={followedUsers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <FollowerList user={item} />}
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
        width: 77,
        height: 77
    },

    proposeItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'white',
        height: 119,
        gap: 10
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
        height: 40,
    }
})