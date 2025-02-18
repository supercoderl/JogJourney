import React from "react"
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

interface BaseButtonProps {
    leftIcon?: React.ReactNode;
    title: string;
    buttonStyle?: ViewStyle;
    titleStyle?: TextStyle;
    onPress: () => void | Promise<void>;
    loading?: boolean
}

const BaseButton: React.FC<BaseButtonProps> = ({ title, buttonStyle, titleStyle, leftIcon, onPress, loading }) => {
    return (
        <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress}>
            {leftIcon && leftIcon}
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
                {loading && <ActivityIndicator color="white" />}
                <Text style={[styles.title, titleStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BaseButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#19A1CB',
        width: '100%',
        textAlign: 'center',
        borderRadius: 10,
        paddingBlock: 8,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15
    },

    title: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    }
})