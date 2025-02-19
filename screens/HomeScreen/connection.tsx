import PostScreen from "@/components/ui/post"
import { Post } from "@/types"
import React from "react"
import { FlatList, View } from "react-native"

const connectionPosts: Post[] = [
    {
        postId: 3,
        title: 'Walking công viên Gia Định. GO GO!!!'
    },
    {
        postId: 4,
        title: 'Yoga tại Hoàng Văn Thụ nào các chị em!'
    }
]

const Connection: React.FC = () => {
    return (
        <View>
            <FlatList
                data={connectionPosts}
                keyExtractor={(item) => item.postId.toString()}
                renderItem={({ item }) => <PostScreen post={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
            />
        </View>
    )
}

export default Connection;