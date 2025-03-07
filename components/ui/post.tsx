import assets from "@/assets"
import screen from "@/utils/screen"
import React, { useState } from "react"
import { View, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import BaseButton from "../Buttons/base-button";
import OutsidePressHandler from 'react-native-outside-press';
import { ensureHttps, toast } from "@/utils";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { deletePostById } from "@/helpers/api";

interface PostProps {
    post: any;
    userInformation: any;
    onReload: () => void;
}

const Modal = () => {
    return (
        <View style={[{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        }, StyleSheet.absoluteFillObject]}>
            <BaseButton
                title="Tham gia"
                onPress={() => { }}
                buttonStyle={{ width: 'auto', paddingHorizontal: 40, paddingBlock: 12, borderRadius: 30, backgroundColor: 'rgb(140, 190, 239)' }}
                titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                viewStyle={{ alignSelf: 'flex-start' }}
            />
        </View>
    )
}

const PostScreen: React.FC<PostProps> = ({ post, userInformation, onReload }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onDelete = async () => {
        await deletePostById(post.id).then(() => {
            toast.success("Chúc mừng", "Xóa bài viết thành công");
            onReload();
        });
    }

    const showAlert = () =>
        Alert.alert(
            'Xóa bài viết',
            'Bạn có chắc chắn muốn xóa bài này? Bài viết sẽ không thể được hoàn tác lại!',
            [
                {
                    text: 'Đồng ý',
                    onPress: onDelete,
                    style: 'default',
                },
                {
                    text: 'Hủy bỏ',
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
            },
        );

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.userWrapper}>
                    <View style={styles.informationWrapper}>
                        <Image
                            source={userInformation?.avatar ? { uri: ensureHttps(userInformation?.avatar) } : assets.image.avatar}
                            style={styles.avatar}
                        />
                        <Text style={styles.name}>{userInformation?.name ?? userInformation?.fullname ?? 'Dương Kha'}</Text>
                    </View>
                    <Menu>
                        <MenuTrigger>
                            <Image source={assets.image.option} style={{ width: 24, height: 24 }} />
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ width: 100 }}>
                            {userInformation?.userId === post?.userId && <MenuOption style={{ padding: 10 }} onSelect={showAlert} text='Xóa bài viết' />}
                            <MenuOption style={{ padding: 10 }} onSelect={() => { }} text='Báo cáo' />
                        </MenuOptions>
                    </Menu>
                </View>

                <Text style={styles.title}>{post.title}</Text>
            </View>

            <View style={styles.map}>
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    onPress={() => setModalVisible(true)}
                    region={{
                        latitude: post?.location?.latitude ?? 0,
                        longitude: post?.location?.longitude ?? 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                >
                    <Marker
                        coordinate={{ latitude: post?.location?.latitude ?? 0, longitude: post?.location?.longitude ?? 0 }}
                        title=""
                        description=""
                    />
                </MapView>
                {
                    modalVisible &&
                    <OutsidePressHandler
                        onOutsidePress={() => setModalVisible(false)}
                        style={[{
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }, StyleSheet.absoluteFillObject]}
                    >
                        <Modal />
                    </OutsidePressHandler>
                }
            </View>

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