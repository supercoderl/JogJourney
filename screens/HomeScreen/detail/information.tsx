import React from "react"
import { View, Text, StyleSheet } from "react-native"

interface InformationDetailProps {
    data: any[];
}

const InformationDetail: React.FC<InformationDetailProps> = ({ data }) => {
    return (
        <View style={styles.informationWrapper}>
            {
                data && data.length > 0 &&
                data.map((item, index) => (
                    <View style={styles.item} key={index}>
                        <Text style={styles.value}>{item?.value}</Text>
                        <Text style={styles.text}>{item?.text}</Text>
                    </View>
                ))
            }
        </View>
    )
}

export default InformationDetail;

const styles = StyleSheet.create({
    informationWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Để xuống dòng khi đủ 2 item
        justifyContent: 'center',
        alignItems: 'center',
    },

    item: {
        width: '48%', // Chia đôi màn hình, chừa 2% margin
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBlock: 10,
        paddingHorizontal: 20,
    },

    text: {
        fontSize: 14,
        fontWeight: 'regular',
        fontFamily: 'Lohit Bengali',
        color: '#19A1CB'
    },

    value: {
        fontWeight: 'regular',
        fontFamily: 'Jomhuria',
        fontSize: 40,
        color: '#342E2E',
        marginBottom: -15
    },
})