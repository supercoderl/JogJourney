import PostScreen from "@/components/ui/post"
import { Post } from "@/types"
import React from "react"
import { FlatList, View } from "react-native"

const myPosts: Post[] = [
    {
        postId: 1,
        title: 'Hôm nay chạy bộ được 10 cây số',
    },
    {
        postId: 2,
        title: 'Tập xe đạp buổi chiều',
    }
]

const Me: React.FC = () => {
    return (
        <View>
            <FlatList
                data={myPosts}
                keyExtractor={(item) => item.postId.toString()}
                renderItem={({ item }) => <PostScreen post={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
            />
        </View>
    )
}

export default Me;