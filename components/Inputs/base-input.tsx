import React from "react"
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native"

interface BaseInputProps extends TextInputProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    viewStyle?: ViewStyle;
}

const BaseInput: React.FC<BaseInputProps> = ({ leftIcon, rightIcon, viewStyle, ...props }) => {
    return (
        <View style={[styles.container, viewStyle]}>
            {leftIcon && leftIcon}
            <TextInput style={styles.input} {...props} />
            {rightIcon && rightIcon}
        </View>
    )
}

export default BaseInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        marginLeft: 8,
    },
})