import React from "react"
import { StyleSheet, Text, View } from "react-native"
import BaseButton from "../Buttons/base-button";

interface BaseBlankProps {
    onReload: () => void;
}

const BaseBlank: React.FC<BaseBlankProps> = ({ onReload }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontStyle: 'italic' }}>Không có dữ liệu</Text>
            <BaseButton
                title="Tải lại"
                onPress={onReload}
            />
        </View>
    )
}

export default BaseBlank;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    }
});