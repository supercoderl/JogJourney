import Loading from "@/components/Loadings/loading"
import PostScreen from "@/components/ui/post"
import { getPostsByUser } from "@/helpers/api"
import { useAuth } from "@/providers"
import React, { useEffect, useState } from "react"
import { FlatList, RefreshControl, View } from "react-native"

const Me: React.FC = () => {
    const { userInformation } = useAuth();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    const getPosts = async () => {
        setLoading(true);

        try {
            const postsData = await getPostsByUser(userInformation.userId);
            setPosts(postsData);
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
    }, []);

    return (
        <View>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <PostScreen post={item} userInformation={userInformation} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={getPosts}
                    />
                }
            />

            {loading && <Loading size={40} />}
        </View>
    )
}

export default Me;