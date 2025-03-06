import React from "react";
import { Pressable, View } from "react-native";

interface RadioButtonProps {
    value: any;
    selected: boolean;
    onPress: (value: any) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, selected, onPress }) => {
    return (
        <Pressable
            onPress={() => onPress(value)}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
        >
            <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selected ? '#007AFF' : '#ccc',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {selected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#007AFF' }} />}
            </View>
        </Pressable>
    );
};

export default RadioButton;