import React, { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View, Text, Modal, FlatList } from "react-native";

interface BaseSelectProps {
    data: any[];
    selected: any;
    onSelect: (value: any) => void;
    leftIcon?: React.ReactNode;
    placeHolderText?: string;
}

const BaseSelect: React.FC<BaseSelectProps> = ({ data, selected, onSelect, leftIcon, placeHolderText }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            {/* Button mở Dropdown */}
            <Pressable style={styles.container} onPress={() => setVisible(true)}>
                {leftIcon && leftIcon}
                <Text style={{ color: selected ? 'black' : '#8A8A8A', fontSize: 16, paddingHorizontal: 10, }}>{selected || placeHolderText || "Chọn một mục"}</Text>
            </Pressable>

            {/* Modal hiển thị danh sách lựa chọn */}
            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        onSelect(item.value);
                                        setVisible(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default BaseSelect;

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
        height: 45
    },
    leftIcon: {
        marginRight: 8,
    },
    overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
    modalContent: { backgroundColor: "#fff", width: "80%", borderRadius: 10, padding: 10 },
    option: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
    optionText: { fontSize: 16 },
    result: { marginTop: 20, fontSize: 18, fontWeight: "bold" }
})