import BaseBlank from "@/components/Blanks/default-blank"
import Loading from "@/components/Loadings/loading"
import PostScreen from "@/components/ui/post"
import { getPostsWithoutUser, getUserById } from "@/helpers/api"
import { useAuth } from "@/providers"
import React, { useEffect, useState } from "react"
import { FlatList, RefreshControl, View } from "react-native"

const Connection: React.FC = () => {
    const { userInformation, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    const getPosts = async () => {
        setLoading(true);

        try {
            const postsData = await getPostsWithoutUser(userInformation?.userId);

            // Lấy danh sách userId từ danh sách posts
            const userIds = [...new Set(postsData.map((post: any) => post.userId))];

            // Lấy thông tin user từ bảng user
            const usersData = await Promise.all(
                userIds.map(async userId => {
                    const userInfo = await getUserById(userId); // Hàm lấy user từ Firestore
                    return { userId, userInfo };
                })
            );

            // Tạo object { userId: userInfo } để tra cứu nhanh
            const usersMap = Object.fromEntries(usersData.map(u => [u.userId, u.userInfo]));

            const postsWithUserInfo = postsData.map((post: any) => ({
                ...post,
                user: usersMap[post.userId] || null // Thêm thông tin user vào post
            }));

            setPosts(postsWithUserInfo);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userInformation) {
            getPosts();
        }
    }, [userInformation, user]);

    return (
        <View>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <PostScreen onReload={getPosts} post={item} userInformation={item?.user} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
                ListEmptyComponent={<BaseBlank onReload={getPosts} />}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={getPosts}
                    />
                }
            />

            {loading && <Loading backgroundColor="#c1c3c7" size={40} />}
        </View>
    )
}

export default Connection;