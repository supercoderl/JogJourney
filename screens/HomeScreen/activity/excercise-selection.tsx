import Horizontal from "@/components/Horizontal"
import Loading from "@/components/Loadings/loading"
import { firestore } from "@/lib/firebase-config"
import screen from "@/utils/screen"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { collection, getDocs, orderBy, query } from "@firebase/firestore"
import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"

const ExcerciseSelection = () => {
    const [excercises, setExcercises] = useState<any[]>([]);
    const [fetchLoading, setLoading] = useState(false);
    const [selectedEx, setSelectedEx] = useState<any>(null);

    const getExcercises = async () => {
        setLoading(true);

        const q = query(collection(firestore, "excercises"), orderBy("index", "asc"));
        await getDocs(q).then((res) => {
            setExcercises(res.docs.map(doc => ({ ...doc.data() })));
            setSelectedEx(res.docs.map(doc => ({ ...doc.data() }))[0]);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getExcercises();
    }, []);

    return (
        <>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>Chọn bài tập</Text>

                <View>
                    <FlatList
                        data={excercises}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => setSelectedEx(item)}
                            >
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialIcons name={item.icon} size={50} color={selectedEx?.index === item.index ? "#19A1CB" : "#8A8A8A"} />
                                    <Text style={[styles.text, { color: selectedEx?.index === item.index ? '#19A1CB' : '#8A8A8A' }]}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBlock: 5 }}
                    />

                    {fetchLoading && <Loading size={20} />}
                </View>
            </View>

            <Horizontal height={10} color="rgba(0, 0, 0, 0.03)" />

            <View style={styles.itemContainer}>
                <Text style={styles.title}>Hôm nay</Text>

                <View style={{ paddingBlock: 20, position: 'relative' }}>
                    <View style={{
                        backgroundColor: '#19A1CB',
                        width: 162,
                        height: 162,
                        borderRadius: screen.width,
                        borderWidth: 10,
                        borderColor: '#07476D',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1
                    }}>
                        <MaterialIcons name={selectedEx?.icon} size={90} color="white" />
                        {fetchLoading && <Loading size={40} viewStyle={{ borderRadius: screen.width }} />}
                    </View>

                    <View style={{
                        position: 'absolute', width: '65%', zIndex: 0, top: 25.225, left: '30%'
                    }}>
                        <View style={[styles.infoBox, { backgroundColor: "#1DA1F2" }]}>
                            <Text style={styles.infoText}>5,2 km</Text>
                        </View>
                        <View style={[styles.infoBox, { backgroundColor: "#28A745" }]}>
                            <Text style={styles.infoText}>45 phút</Text>
                        </View>
                        <View style={[styles.infoBox, { backgroundColor: "#FFC107" }]}>
                            <Text style={styles.infoText}>680 kcal</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default ExcerciseSelection;

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
        paddingBlock: 15,
        paddingHorizontal: 20
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 24,
        color: 'black'
    },

    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#595050'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(25, 161, 203, 0.35)',
        paddingBlock: 2,
    },

    infoBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 5,
    },

    infoText: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    }
})