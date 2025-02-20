import React from "react"
import { View, ViewStyle } from "react-native"

interface HorizontalProps {
    color: string;
    height: number;
    styles?: ViewStyle;
    width?: number;
}

const Horizontal: React.FC<HorizontalProps> = ({ color, height, styles, width }) => {
    return <View style={[{ width: width ?? '100%', height, backgroundColor: color }, styles]}></View>
}

export default Horizontal;