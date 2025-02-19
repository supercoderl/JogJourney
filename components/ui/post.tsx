import assets from "@/assets"
import { Post } from "@/types";
import screen from "@/utils/screen"
import React from "react"
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import MapView from 'react-native-maps';

interface PostProps {
    post: Post
}

const PostScreen: React.FC<PostProps> = ({ post }) => {
    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.userWrapper}>
                    <View style={styles.informationWrapper}>
                        <Image
                            source={assets.image.avatar}
                            style={styles.avatar}
                        />
                        <Text style={styles.name}>Dương Kha</Text>
                    </View>
                    <Image source={assets.image.option} style={{ width: 24, height: 24 }} />
                </View>

                <Text style={styles.title}>{post.title}</Text>
            </View>

            <MapView style={styles.map} />

            <View style={styles.navWrapper}>
                <TouchableOpacity>
                    <Image source={assets.image.like} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={assets.image.comment} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={assets.image.star} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        backgroundColor: '#19A1CB',
        width: screen.width / 1.2
    },

    userWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    informationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    avatar: {
        width: 30,
        height: 30,
        borderRadius: screen.width,
    },

    name: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 15,
        color: '#342E2E'
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 13,
        color: 'white',
        marginBlock: 15
    },
    map: {
        width: '100%',
        height: 206,
    },

    navWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 30
    }
})