import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

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
    const translateX = useSharedValue(0);

    React.useEffect(() => {
        translateX.value = withRepeat(
            withTiming(-TOTAL_WIDTH / 2, {
                duration: 20000,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView>
                <View style={styles.section}>
                    <Animated.Text entering={FadeInDown.duration(800)} style={styles.title}>
                        Our <Text style={styles.titleAccent}>Specialized</Text> Services
                    </Animated.Text>

                    <View style={styles.marqueeContainer}>
                        <Animated.View
                            style={[
                                styles.marquee,
                                animatedStyle,
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
