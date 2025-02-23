import React from "react"
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"

interface LoadingProps {
    size: number;
    color?: string;
    viewStyle?: ViewStyle;
    backgroundColor?: string;
}

const Loading: React.FC<LoadingProps> = ({ size, color, viewStyle, backgroundColor }) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: backgroundColor ?? '#edf1f7', justifyContent: 'center', alignItems: 'center', zIndex: 1 }, viewStyle]}>
            <ActivityIndicator size={size ?? 24} color={color ?? 'black'} />
        </View>
    )
}

export default Loading;