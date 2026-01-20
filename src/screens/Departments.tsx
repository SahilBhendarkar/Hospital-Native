import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { departments } from "../data/departments";
import { useNavigation } from "@react-navigation/native";

const Departments = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Departments</Text>

            <FlatList
                data={departments}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("DepartmentDetails", {
                                department: item,
                            })
                        }
                    >
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text numberOfLines={3} style={styles.description}>
                                {item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Departments;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
    heading: { fontSize: 26, fontWeight: "700", textAlign: "center", marginBottom: 16 },
    row: { justifyContent: "space-between", marginBottom: 12 },
    card: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 4,
    },
    image: { width: "100%", height: 120 },
    cardContent: { padding: 12 },
    title: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
    description: { fontSize: 13, color: "#6b7280" },
});
