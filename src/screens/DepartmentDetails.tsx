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

import Animated, { FadeInDown, FadeIn, FadeInRight } from "react-native-reanimated";

import { wp, hp, moderateScale } from "../utils/responsive";

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
            <Animated.View entering={FadeIn.duration(800)}>
                <ImageBackground source={departmentData.image} style={styles.heroHeader}>
                    <View style={styles.overlay}>
                        <Animated.Text entering={FadeInDown.delay(200).duration(600)} style={styles.heroTitle}>{departmentData.title}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(600)} style={styles.heroSubtitle}>
                            {departmentData.description}
                        </Animated.Text>
                    </View>
                </ImageBackground>
            </Animated.View>

            <View style={styles.content}>
                {/* About Section */}
                <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.section}>
                    <Text style={styles.sectionHeader}>About {departmentData.title}</Text>
                    <Text style={styles.descriptionText}>
                        {departmentData.description} Our department is dedicated to providing comprehensive care using the latest medical technologies and expert specialists.
                    </Text>
                </Animated.View>

                {/* Services Section */}
                <View style={styles.section}>
                    <Animated.Text entering={FadeInDown.delay(700)} style={styles.sectionHeader}>Services Offered</Animated.Text>
                    <View style={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <Animated.View
                                key={index}
                                entering={FadeInRight.delay(800 + index * 100).duration(400)}
                                style={styles.serviceItem}
                            >
                                <Text style={styles.serviceBullet}>•</Text>
                                <Text style={styles.serviceText}>{service}</Text>
                            </Animated.View>
                        ))}
                    </View>
                </View>

                {/* Specialists Section */}
                {departmentDoctors.length > 0 && (
                    <View style={styles.section}>
                        <Animated.Text entering={FadeInDown.delay(1200)} style={[styles.sectionHeader, { textAlign: 'center' }]}>Our Specialists</Animated.Text>
                        <View style={styles.specialistsGrid}>
                            {departmentDoctors.map((doc, index) => (
                                <Animated.View
                                    key={doc.id}
                                    entering={FadeInDown.delay(1300 + index * 100).springify()}
                                    style={styles.doctorCard}
                                >
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
                                    <TouchableOpacity onPress={() => navigation.navigate("DoctorDetails", { doctor: doc })}>
                                        <Text style={styles.viewProfile}>View Profile →</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </View>
                    </View>
                )}

                {/* CTA Section */}
                <Animated.View entering={FadeIn.delay(1500).duration(800)} style={styles.ctaSection}>
                    <Text style={styles.ctaTitle}>
                        Take the First Step Towards Better Health
                    </Text>
                    <TouchableOpacity
                        style={styles.ctaButton}
                        onPress={() => navigation.navigate("Appointment", { department: departmentData.title })}
                    >
                        <Text style={styles.ctaButtonText}>Schedule an Appointment</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ScrollView>
    );
};

export default DepartmentDetails;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    heroHeader: {
        width: "100%",
        height: hp(35),
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: wp(5),
    },
    heroTitle: {
        fontSize: moderateScale(32),
        fontWeight: "700",
        color: "#fff",
        marginBottom: hp(1.5),
        textAlign: "center",
    },
    heroSubtitle: {
        fontSize: moderateScale(16),
        color: "#e5e7eb",
        textAlign: "center",
        lineHeight: moderateScale(24),
    },
    content: {
        padding: wp(5),
    },
    section: {
        marginBottom: hp(4),
    },
    sectionHeader: {
        fontSize: moderateScale(22),
        fontWeight: "700",
        color: "#111827",
        marginBottom: hp(2),
    },
    descriptionText: {
        fontSize: moderateScale(16),
        color: "#4b5563",
        lineHeight: moderateScale(24),
    },
    servicesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    serviceItem: {
        width: "50%",
        flexDirection: "row",
        marginBottom: hp(1.5),
        paddingRight: wp(2),
    },
    serviceBullet: {
        fontSize: moderateScale(16),
        color: "#1e40af",
        marginRight: wp(2),
        fontWeight: 'bold',
    },
    serviceText: {
        fontSize: moderateScale(15),
        color: "#374151",
        flex: 1,
    },
    specialistsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: wp(4),
    },
    doctorCard: {
        width: wp(42),
        backgroundColor: "#fff",
        borderRadius: wp(4),
        padding: wp(4),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp(0.5) },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: hp(1.5),
        borderWidth: 1,
        borderColor: "#f3f4f6",
    },
    doctorImage: {
        width: wp(18),
        height: wp(18),
        borderRadius: wp(9),
        marginBottom: hp(1.5),
    },
    doctorName: {
        fontSize: moderateScale(16),
        fontWeight: "700",
        textAlign: "center",
        color: "#111827",
        marginBottom: hp(0.5),
    },
    doctorSpec: {
        fontSize: moderateScale(13),
        color: "#4b5563",
        textAlign: "center",
        marginBottom: hp(0.5),
    },
    doctorExp: {
        fontSize: moderateScale(12),
        color: "#6b7280",
        marginBottom: hp(1.5),
    },
    viewProfile: {
        fontSize: moderateScale(14),
        color: "#2563eb",
        fontWeight: "600",
    },
    ctaSection: {
        alignItems: "center",
        marginTop: hp(1),
        marginBottom: hp(5),
        paddingTop: hp(2.5),
        borderTopWidth: 1,
        borderTopColor: "#f3f4f6",
    },
    ctaTitle: {
        fontSize: moderateScale(20),
        fontWeight: "700",
        color: "#111827",
        textAlign: "center",
        marginBottom: hp(2.5),
    },
    ctaButton: {
        backgroundColor: "#2563eb",
        paddingVertical: hp(2),
        paddingHorizontal: wp(8),
        borderRadius: wp(2),
        width: "100%",
        alignItems: "center",
    },
    ctaButtonText: {
        color: "#fff",
        fontSize: moderateScale(16),
        fontWeight: "600",
    },
});
