import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { doctors } from "../data/doctors";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

const Doctors = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Our Doctors</Text>

            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("DoctorDetails", { doctor: item })}
                    >
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.specialization}>{item.specialization}</Text>
                            <Text style={styles.experience}>{item.experience}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Doctors;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
    heading: { fontSize: 26, fontWeight: "700", textAlign: "center", marginBottom: 16 },
    row: { justifyContent: "space-between", marginBottom: 12 },
    card: {
        width: CARD_WIDTH,
        backgroundColor: "white",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 4,
    },
    image: { width: "100%", height: 160 },
    cardContent: { padding: 12, alignItems: "center" },
    name: { fontSize: 15, fontWeight: "700", textAlign: "center" },
    specialization: { fontSize: 13, color: "#2563eb" },
    experience: { fontSize: 12, color: "#6b7280" },
});
