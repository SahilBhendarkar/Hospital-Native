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

import Animated, { FadeInDown, FadeInUp, FadeIn } from "react-native-reanimated";

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
            <Animated.View
                entering={FadeInUp.duration(600)}
                style={styles.heroSection}
            >
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600).springify()}
                    style={styles.imageWrapper}
                >
                    <Image
                        source={
                            typeof doctorData.image === "string"
                                ? { uri: doctorData.image }
                                : doctorData.image
                        }
                        style={styles.doctorImage}
                    />
                </Animated.View>
                <Animated.Text entering={FadeInDown.delay(300)} style={styles.name}>{doctorData.name}</Animated.Text>
                <Animated.Text entering={FadeInDown.delay(400)} style={styles.specialization}>{doctorData.specialization}</Animated.Text>
                <Animated.Text entering={FadeInDown.delay(500)} style={styles.qualification}>{doctorData.qualification}</Animated.Text>
            </Animated.View>

            <View style={styles.content}>
                {/* About Section */}
                <Animated.View
                    entering={FadeInDown.delay(600).duration(600)}
                    style={styles.section}
                >
                    <Text style={styles.sectionHeader}>About Doctor</Text>
                    <Text style={styles.descriptionText}>
                        {doctorData.bio} Dedicated to providing the best medical care with a focus on patient safety and comfort.
                    </Text>
                </Animated.View>

                {/* Details Table-ish */}
                <Animated.View
                    entering={FadeInDown.delay(700).duration(600)}
                    style={styles.detailsBox}
                >
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Experience</Text>
                        <Text style={styles.detailValue}>{doctorData.experience}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Departments</Text>
                        <Text style={styles.detailValue}>{doctorData.departments.join(", ")}</Text>
                    </View>
                </Animated.View>

                {/* CTA Section */}
                <Animated.View
                    entering={FadeIn.delay(800).duration(800)}
                    style={styles.ctaSection}
                >
                    <Text style={styles.ctaTitle}>
                        Need a Consultation?
                    </Text>
                    <TouchableOpacity
                        style={styles.ctaButton}
                        onPress={() => navigation.navigate("Appointment", { doctor: doctorData.name })}
                    >
                        <Text style={styles.ctaButtonText}>Book Appointment</Text>
                    </TouchableOpacity>
                </Animated.View>
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
        backgroundColor: "#f0f9ff", 
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
