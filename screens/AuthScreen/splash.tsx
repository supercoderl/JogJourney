import assets from '@/assets';
import React from 'react';
import { ImageBackground, View } from 'react-native';

export default () => {
    // const init = async () => {
    //     const status = await asyncStorage.get_storage_data('isLoggedIn');
    //     if (status) {
    //         navigation.replace('home');
    //     }
    //     else {
    //         navigation.replace('login');
    //     }
    // };

    // useEffect(() => {
    //     init();
    // }, []);

    return (
        <View className='flex-1 flex flex-col bg-white'>
            <View className='flex-1 flex justify-center items-center'>
                <ImageBackground
                    source={assets.image.background}
                    className='w-full h-auto object-cover'
                />
            </View>
        </View>
    );
};
