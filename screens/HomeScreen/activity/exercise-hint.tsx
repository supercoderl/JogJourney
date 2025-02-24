import assets from "@/assets"
import Loading from "@/components/Loadings/loading"
import { firestore } from "@/lib/firebase-config"
import { ensureHttps } from "@/utils"
import { collection, getDocs, query } from "@firebase/firestore"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native"

const ExerciseHint = () => {
    const [maps, setMaps] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getMaps = async () => {
        setLoading(true);

        await getDocs(collection(firestore, "maps")).then((res) => {
            setMaps(res.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getMaps();
    }, []);

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>Gợi ý luyện tập</Text>

            <View>
                <FlatList
                    data={maps}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ borderRadius: 10 }} onPress={() => router.push({ pathname: '/(map)/map-selection', params: item })}>
                            <Image source={item?.image ? { uri: ensureHttps(item?.image) } : assets.image.image} style={styles.image} />
                            <View style={{ backgroundColor: '#19A1CB', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 20, color: '#07476D' }}>GOAL {item?.distance ?? '5'}km</Text>
                                <Text style={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: 20, color: 'white' }}>{item?.name ?? 'Công viên gia định'}</Text>
                                <Text style={{ fontWeight: 'regular', fontFamily: 'Inter', fontSize: 13, color: 'white' }}>{item?.address ?? 'P3, Gò Vấp, Tp. HCM'}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBlock: 15, gap: 8 }}
                />

                {loading && <Loading size={40} />}
            </View>
        </View>
    )
}

export default ExerciseHint;

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

    image: {
        width: 311,
        height: 184,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
})