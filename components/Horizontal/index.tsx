import React from "react"
import { View, ViewStyle } from "react-native"

interface HorizontalProps {
    color: string;
    height: number;
    styles?: ViewStyle;
}

const Horizontal: React.FC<HorizontalProps> = ({ color, height, styles }) => {
    return <View style={[{ width: '100%', height, backgroundColor: color }, styles]}></View>
}

export default Horizontal;