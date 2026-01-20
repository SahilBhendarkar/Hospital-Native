import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const DepartmentDetails = () => {
    const route = useRoute<any>();
    const { department } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={department.image} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{department.title}</Text>
                <Text style={styles.description}>{department.description}</Text>
            </View>
        </ScrollView>
    );
};

export default DepartmentDetails;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    image: { width: "100%", height: 240 },
    content: { padding: 16 },
    title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
    description: { fontSize: 15, lineHeight: 22, color: "#374151" },
});
