import assets from "@/assets";
import BaseButton from "@/components/Buttons/base-button";
import Header from "@/components/Headers/header-home";
import { firestore } from "@/lib/firebase-config";
import { useAuth } from "@/providers";
import { toast } from "@/utils";
import screen from "@/utils/screen";
import { addDoc, collection } from "@firebase/firestore";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function PostScreen() {
    const { userInformation } = useAuth();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const [location, setLocation] = useState({
        latitude: 10.7769, // Vĩ độ mặc định (TPHCM)
        longitude: 106.7009, // Kinh độ mặc định (TPHCM)
    });

    const [delta, setDelta] = useState({
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const handlePost = async () => {
        const body = {
            title,
            userId: userInformation?.userId,
            location: { latitude: location.latitude, longitude: location.longitude },
            createdAt: new Date(),
        };

        setLoading(true);

        await addDoc(collection(firestore, 'posts'), body).then(() => {
            toast.success("Chúc mừng", "Đăng bài thành công!");
            setTitle('');
        }).catch(err => console.log(err)).finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={assets.image.left_white} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                }
                rightIcon={
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <TouchableOpacity onPress={() => router.push('/(profile)/edit-information')}>
                            <Image source={assets.image.edit} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(profile)/setting')}>
                            <Image source={assets.image.setting} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    </View>
                }
            />

            <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 15, paddingBlock: 40 }}>
                <View style={styles.information}>
                    <Image source={userInformation?.avatar ? { uri: userInformation?.avatar } : assets.image.account_circle} style={styles.avatar} />
                    <Text style={styles.name}>{userInformation?.fullname ?? 'Nguyễn Văn A'}</Text>
                    <Image source={assets.image.more_horiz} style={styles.moreBtn} />
                </View>

                <TextInput
                    placeholder="Bạn đang làm gì?"
                    placeholderTextColor={'#8A8A8A'}
                    style={styles.input}
                    multiline={true}
                    numberOfLines={12}
                    value={title}
                    onChangeText={setTitle}
                />

                <MapView
                    style={styles.map}
                    initialRegion={{ ...location, ...delta }} // Vị trí ban đầu
                    onRegionChangeComplete={(region) => {
                        setDelta({
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        });
                    }}
                    onPress={(e) => {
                        const { latitude, longitude } = e.nativeEvent.coordinate;
                        setLocation({ latitude, longitude });
                    }}
                >
                    {/* Marker có thể kéo */}
                    <Marker
                        coordinate={location}
                        draggable // Cho phép kéo Marker
                        pinColor="red" // Kim màu đỏ
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            setLocation({ ...location, latitude, longitude });
                        }}
                    />
                </MapView>

                <View style={styles.operation}>
                    <Text style={{ fontSize: 13, color: 'white' }}>Thêm vào bài viết của bạn</Text>
                    <TouchableOpacity>
                        <Image source={assets.image.broken_image_white} style={{ width: 25.5, height: 25.5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={assets.image.group_white} style={{ width: 29.18, height: 20.43 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={assets.image.more_white} style={{ width: 25.24, height: 25 }} />
                    </TouchableOpacity>
                </View>

                <BaseButton
                    title="Đăng"
                    buttonStyle={{ backgroundColor: title === '' ? '#8A8A8A' : '#19A1CB' }}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    onPress={handlePost}
                    viewStyle={{ flex: 1 }}
                    disabled={title === ''}
                    loading={loading}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    information: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },

    name: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#342E2E',
    },

    avatar: {
        width: 32,
        height: 32,
    },

    moreBtn: {
        width: 25,
        height: 25
    },

    operation: {
        flexDirection: 'row',
        backgroundColor: '#19A1CB',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 20
    },

    input: {
        fontSize: 20,
        height: screen.height / 4,
        textAlignVertical: 'top'
    },

    map: {
        width: '100%',
        height: screen.height / 3.5,
        marginBottom: 20
    }
});