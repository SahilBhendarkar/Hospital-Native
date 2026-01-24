import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { doctors } from "../data/doctors";

const { width } = Dimensions.get("window");

const DoctorDetails = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { doctor, id } = route.params;

    const doctorData = doctor || doctors.find((d) => d.id.toString() === id?.toString());

    if (!doctorData) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <Text>Doctor not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={
                            typeof doctorData.image === "string"
                                ? { uri: doctorData.image }
                                : doctorData.image
                        }
                        style={styles.doctorImage}
                    />
                </View>
                <Text style={styles.name}>{doctorData.name}</Text>
                <Text style={styles.specialization}>{doctorData.specialization}</Text>
                <Text style={styles.qualification}>{doctorData.qualification}</Text>
            </View>

            <View style={styles.content}>
                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>About Doctor</Text>
                    <Text style={styles.descriptionText}>
                        {doctorData.bio} {doctorData.bio} Dedicated to providing the best medical care with a focus on patient safety and comfort.
                    </Text>
                </View>

                {/* Details Table-ish */}
                <View style={styles.detailsBox}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Experience</Text>
                        <Text style={styles.detailValue}>{doctorData.experience}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Departments</Text>
                        <Text style={styles.detailValue}>{doctorData.departments.join(", ")}</Text>
                    </View>
                </View>

                {/* CTA Section */}
                <View style={styles.ctaSection}>
                    <Text style={styles.ctaTitle}>
                        Need a Consultation?
                    </Text>
                    <TouchableOpacity
                        style={styles.ctaButton}
                        onPress={() => navigation.navigate("Appointment", { doctor: doctorData.name })}
                    >
                        <Text style={styles.ctaButtonText}>Book Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default DoctorDetails;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    heroSection: {
        alignItems: "center",
        paddingVertical: 32,
        backgroundColor: "#f0f9ff", // Light blue bg
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        marginBottom: 20,
    },
    imageWrapper: {
        width: 140,
        height: 140,
        borderRadius: 70,
        overflow: "hidden",
        borderWidth: 4,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 16,
        backgroundColor: '#e2e8f0',
    },
    doctorImage: {
        width: "100%",
        height: "100%",
    },
    name: {
        fontSize: 26,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
        textAlign: 'center',
    },
    specialization: {
        fontSize: 16,
        color: "#2563eb",
        fontWeight: "600",
        marginBottom: 4,
        textAlign: 'center',
    },
    qualification: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: 'center',
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 16,
        color: "#4b5563",
        lineHeight: 24,
    },
    detailsBox: {
        backgroundColor: "#f9fafb",
        borderRadius: 12,
        padding: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: "#f3f4f6",
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginVertical: 4,
    },
    detailLabel: {
        fontSize: 15,
        color: "#6b7280",
        fontWeight: "500",
    },
    detailValue: {
        fontSize: 15,
        color: "#111827",
        fontWeight: "600",
        maxWidth: "60%",
        textAlign: "right",
    },
    ctaSection: {
        alignItems: "center",
        paddingTop: 10,
    },
    ctaTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        textAlign: "center",
        marginBottom: 16,
    },
    ctaButton: {
        backgroundColor: "#2563eb",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    ctaButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
