import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react"
import { StyleSheet, TextInput, TextInputProps, View } from "react-native"
import screen from "@/utils/screen";

interface BaseInputProps extends TextInputProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const BaseInput: React.FC<BaseInputProps> = ({ leftIcon, rightIcon, ...props }) => {
    return (
        <View style={styles.container}>
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