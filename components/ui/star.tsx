import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"
import { StyleSheet, Text, View } from "react-native"

interface StarProps {
    size: number,
    text: string,
    color: string
}

const Star: React.FC<StarProps> = ({ size, text, color }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="star" size={size} color={color} style={{ zIndex: 1 }} />
            <Text style={[{ position: 'absolute', zIndex: 2, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', textAlign: 'center', top: size / 3.5, fontSize: 13 }]}>{text}</Text>
        </View>
    )
}

export default Star;