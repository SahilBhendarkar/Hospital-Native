import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { doctors } from "../data/doctors";
import { departments } from "../data/departments";

const { width } = Dimensions.get("window");

const DepartmentDetails = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { department, id } = route.params;

    const departmentData = department || departments.find((d) => d.id.toString() === id?.toString());

    if (!departmentData) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <Text>Department not found</Text>
            </View>
        );
    }

    const departmentDoctors = doctors.filter((doc) =>
        doc.departments.includes(departmentData.title)
    );

    const defaultServices = [
        "Advanced diagnostics",
        "Expert specialist consultations",
        "Modern treatment facilities",
        "24x7 patient care",
    ];
    const services = departmentData.services || defaultServices;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <ImageBackground source={departmentData.image} style={styles.heroHeader}>
                <View style={styles.overlay}>
                    <Text style={styles.heroTitle}>{departmentData.title}</Text>
                    <Text style={styles.heroSubtitle}>
                        {departmentData.description}
                    </Text>
                </View>
            </ImageBackground>

            <View style={styles.content}>
                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>About {departmentData.title}</Text>
                    <Text style={styles.descriptionText}>
                        {departmentData.description} {departmentData.description} A condition where the blood vessels that supply oxygen and nutrients to the heart muscle become narrowed or blocked.
                    </Text>
                </View>

                {/* Services Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Services Offered</Text>
                    <View style={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <View key={index} style={styles.serviceItem}>
                                <Text style={styles.serviceBullet}>•</Text>
                                <Text style={styles.serviceText}>{service}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Specialists Section */}
                {departmentDoctors.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionHeader, { textAlign: 'center' }]}>Our Specialists</Text>
                        <View style={styles.specialistsGrid}>
                            {departmentDoctors.map((doc) => (
                                <View key={doc.id} style={styles.doctorCard}>
                                    <Image
                                        source={
                                            typeof doc.image === "string"
                                                ? { uri: doc.image }
                                                : doc.image
                                        }
                                        style={styles.doctorImage}
                                    />
                                    <Text style={styles.doctorName}>{doc.name}</Text>
                                    <Text style={styles.doctorSpec}>{doc.specialization}</Text>
                                    <Text style={styles.doctorExp}>{doc.experience}</Text>
                                    <TouchableOpacity onPress={() => console.log("View Profile", doc.name)}>
                                        <Text style={styles.viewProfile}>View Profile →</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* CTA Section */}
                <View style={styles.ctaSection}>
                    <Text style={styles.ctaTitle}>
                        Take the First Step Towards Better Health
                    </Text>
                    <TouchableOpacity
                        style={styles.ctaButton}
                        onPress={() => navigation.navigate("Appointment", { department: departmentData.title })}
                    >
                        <Text style={styles.ctaButtonText}>Schedule an Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default DepartmentDetails;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    heroHeader: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 12,
        textAlign: "center",
    },
    heroSubtitle: {
        fontSize: 16,
        color: "#e5e7eb",
        textAlign: "center",
        lineHeight: 24,
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 16,
        color: "#4b5563",
        lineHeight: 24,
    },
    servicesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    serviceItem: {
        width: "50%",
        flexDirection: "row",
        marginBottom: 12,
        paddingRight: 8,
    },
    serviceBullet: {
        fontSize: 16,
        color: "#1e40af", // deep blue
        marginRight: 8,
        fontWeight: 'bold',
    },
    serviceText: {
        fontSize: 15,
        color: "#374151",
        flex: 1,
    },
    specialistsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center", // Center cards if odd number
        gap: 20,
    },
    doctorCard: {
        width: (width - 60) / 2, // 2 columns with spacing
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#f3f4f6",
    },
    doctorImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        color: "#111827",
        marginBottom: 4,
    },
    doctorSpec: {
        fontSize: 13,
        color: "#4b5563",
        textAlign: "center",
        marginBottom: 4,
    },
    doctorExp: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 12,
    },
    viewProfile: {
        fontSize: 14,
        color: "#2563eb",
        fontWeight: "600",
    },
    ctaSection: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 40,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#f3f4f6",
    },
    ctaTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        textAlign: "center",
        marginBottom: 20,
    },
    ctaButton: {
        backgroundColor: "#2563eb", // blue-600
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