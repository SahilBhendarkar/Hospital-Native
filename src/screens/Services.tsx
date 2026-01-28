import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const services = [
    {
        id: "1",
        name: "Oncosurgery",
        image: "Oncoabout.png",
    },
    {
        id: "2",
        name: "Endoscopy",
        image: "endoscopy.png",
    },
    {
        id: "3",
        name: "Plastic & Reconstructive Surgery",
        image: "Plastic-Reconstructive-about.png",
    },
    {
        id: "4",
        name: "Cardiology",
        image: "cardiology-1.png",
    },
    {
        id: "5",
        name: "Laparoscopic Surgery",
        image: "Laparoscopic-Surgery-4.png",
    },
    {
        id: "6",
        name: "Joint Replacement",
        image: "Join-replacement1.png",
    },
    {
        id: "7",
        name: "Palliative Care",
        image: "Palliative-pain-management.png",
    },
    {
        id: "8",
        name: "Radiology",
        image: "Radiology.png",
    },

    {
        id: "9",
        name: "ENT Surgery",
        image: "ENT-surgery-1-1.png",
    },
    {
        id: "10",
        name: "Critical Care & ICU",
        image: "Critical-Care-Medicine-ICU.png",
    },
    {
        id: "11",
        name: "Orthopedics & Trauma",
        image: "Orthopedics-and-trauma.png",
    },
    {
        id: "12",
        name: "Gastroenterology",
        image: "Gastroenterology.png",
    },
    {
        id: "13",
        name: "Neurosurgery & Neurology",
        image: "neurosurgery-and-neurology.png",
    },
    {
        id: "14",
        name: "Pathology",
        image: "pathalogy.png",
    },
    {
        id: "15",
        name: "Ophthalmology (Eye Care)",
        image: "ophtalmology.png",
    },
    {
        id: "16",
        name: "Nephrology",
        image: "nephrology.png",
    },
    {
        id: "17",
        name: "Advanced Dialysis Unit",
        image: "Dedicated-advanced-Dialysis-Unit.png",
    },
];

const CARD_WIDTH = 150;
const TOTAL_WIDTH = CARD_WIDTH * services.length * 2;

const Services = () => {
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const marqueeTranslate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.timing(marqueeTranslate, {
                toValue: -TOTAL_WIDTH / 2,
                duration: 20000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView>
                <View style={styles.section}>
                    <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
                        Our <Text style={styles.titleAccent}>Specialized</Text> Services
                    </Animated.Text>

                    <View style={styles.marqueeContainer}>
                        <Animated.View
                            style={[
                                styles.marquee,
                                { transform: [{ translateX: marqueeTranslate }] },
                            ]}
                        >
                            {[...services, ...services].map((service, index) => (
                                <View key={index} style={styles.serviceCard}>
                                    <Text style={styles.serviceIcon}>⚕️</Text>
                                    <Text style={styles.serviceName}>{service.name}</Text>
                                </View>
                            ))}
                        </Animated.View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Services;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },
    section: {
        paddingVertical: 40,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#1e3a8a',
        marginBottom: 32,
    },
    titleAccent: {
        color: '#10b981',
    },
    marqueeContainer: {
        height: 180,
        overflow: 'hidden',
    },
    marquee: {
        flexDirection: 'row',
    },
    serviceCard: {
        width: 150,
        height: 160,
        backgroundColor: '#1e3a8a',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    serviceIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    serviceName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 8,
    },
});
