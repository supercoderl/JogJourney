import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text>Hello, Welcome</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
