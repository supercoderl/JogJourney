import assets from "@/assets";
import { toast } from "@/utils";
import { router } from "expo-router";
import React, { ReactNode } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"

interface RecordMapProps {
    map?: any;
    handleShowModal: (value: boolean) => void;
    isTracking: boolean;
    border: ReactNode;
    handlePause: () => void;
}

const RecordMap: React.FC<RecordMapProps> = ({ map, handleShowModal, border, handlePause, isTracking }) => {

    return (
        <View style={[styles.contentContainer]}>
            {border}

            {map && <Text style={{ fontFamily: 'Jomhuria', fontSize: 48, color: '#8A8A8A' }}>Goal {map?.distance ?? '5'} km</Text>}

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handlePause}>
                    <Image source={assets.image.pause} style={styles.iconButton} />
                    <Text style={styles.textButton}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if(!isTracking)
                    {
                        toast.error("Không được", "Bộ đếm chưa hoạt động, không thể dừng.");
                        return;
                    }
                    handleShowModal(true)
                }}>
                    <Image source={assets.image.stop} style={styles.iconButton} />
                    <Text style={styles.textButton}>Stop</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RecordMap;

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 30,
        zIndex: 5,
        backgroundColor: 'white'
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    iconButton: {
        width: 20,
        height: 20
    },

    textButton: {
        fontWeight: 'regular',
        fontFamily: 'Jomhuria',
        fontSize: 40,
        color: 'rgba(0, 0, 0, 0.6)'
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
})