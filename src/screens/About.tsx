import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";
const surgeryImage = require("../../assets/images/surgery.png");


const { width } = Dimensions.get("window");

const About = () => {
    const imageOpacity = useRef(new Animated.Value(0)).current;
    const imageTranslate = useRef(new Animated.Value(-40)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const contentTranslate = useRef(new Animated.Value(40)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(imageOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(imageTranslate, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.parallel([
            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 800,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(contentTranslate, {
                toValue: 0,
                duration: 800,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 600,
            delay: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    const services = [
        "Robotic Joint Replacement",
        "Orthopedics and Trauma",
        "Laproscopic Surgery",
        "Cardiology",
        "Neuro Surgery",
        "Neurology",
        "Endoscopy",
        "Oncology & Oncosurgery",
    ];

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <View style={styles.grid}>
                        {/* Image Section */}
                        <Animated.View
                            style={[
                                styles.imageSection,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateX: imageTranslate }],
                                },
                            ]}
                        >
                            <Image source={surgeryImage} style={styles.image} />

                        </Animated.View>

                        {/* Text Section */}
                        <Animated.View
                            style={[
                                styles.textSection,
                                {
                                    opacity: contentOpacity,
                                    transform: [{ translateX: contentTranslate }],
                                },
                            ]}
                        >
                            <Text style={styles.title}>About Us</Text>

                            <Text style={styles.introText}>
                                At <Text style={styles.bold}>Hospital UI</Text>, we are committed to
                                providing exceptional healthcare services delivered with compassion,
                                expertise, and innovation.
                            </Text>

                            <View style={styles.servicesList}>
                                {services.map((service, index) => (
                                    <Text key={index} style={styles.serviceItem}>
                                        • {service}
                                    </Text>
                                ))}
                            </View>

                            <Text style={styles.statsText}>
                                Treated <Text style={styles.bold}>3.5+ lakh OPD</Text>,{" "}
                                <Text style={styles.bold}>40,000 IPD</Text> and{" "}
                                <Text style={styles.bold}>25,000 surgeries</Text> in 10 years.
                            </Text>

                            <Animated.View style={{ opacity: buttonOpacity }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() =>
                                        Linking.openURL("https://lifelinesurat.com/about-us/")
                                    }
                                >
                                    <Text style={styles.buttonText}>Read More</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    grid: {
        gap: 32,
    },
    imageSection: {
        width: width - 32,
        aspectRatio: 1,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textSection: {
        gap: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1e40af',
        borderBottomWidth: 4,
        borderBottomColor: '#2563eb',
        paddingBottom: 12,
        alignSelf: 'flex-start',
    },
    introText: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
    },
    bold: {
        fontWeight: '700',
    },
    servicesList: {
        marginTop: 12,
        gap: 8,
    },
    serviceItem: {
        fontSize: 14,
        color: '#1e3a8a',
        lineHeight: 20,
        fontWeight: '500',
    },
    statsText: {
        fontSize: 16,
        color: '#111827',
        lineHeight: 24,
        marginTop: 12,
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default About;
