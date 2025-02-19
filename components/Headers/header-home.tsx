import React, { ReactNode } from "react"
import { StyleSheet, TouchableOpacity, View, Image } from "react-native"

interface HeaderProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ leftIcon, rightIcon }) => {
    return (
        <View style={style.container}>
            <TouchableOpacity>
                {leftIcon && leftIcon}
            </TouchableOpacity>
            {rightIcon && rightIcon}
        </View>
    )
}

export default Header;

const style = StyleSheet.create({
    container: {
        backgroundColor: '#19A1CB',
        height: 80,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
    }
})