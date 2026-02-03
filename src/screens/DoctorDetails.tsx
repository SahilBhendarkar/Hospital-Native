import React, { useState } from "react";
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

import { wp, hp, moderateScale } from "../utils/responsive";

const generateCurrentWeekDates = () => {
    const dates = [];
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        dates.push({
            id: i,
            day: dayNames[date.getDay()],
            date: date.getDate().toString(),
            fullDate: date.toISOString().split('T')[0],
        });
    }
    return dates;
};

const DAYS = generateCurrentWeekDates();

const TIMES = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "01:00 PM", "02:00 PM", "03:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM"
];

const isTimePassed = (timeString: string) => {
    const today = new Date();
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < today;
};

const DoctorDetails = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { doctor, id } = route.params;

    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState("02:00 PM");

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
                        {doctorData.bio || "Dedicated to providing the best medical care with a focus on patient safety and comfort."}
                    </Text>
                </Animated.View>

                {/* Date Selection */}
                <Animated.View entering={FadeInDown.delay(700)} style={styles.section}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateList}>
                        {DAYS.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.dateCard,
                                    selectedDate === item.id && styles.selectedDateCard
                                ]}
                                onPress={() => setSelectedDate(item.id)}
                            >
                                <Text style={[styles.dayText, selectedDate === item.id && styles.selectedText]}>{item.day}</Text>
                                <Text style={[styles.dateText, selectedDate === item.id && styles.selectedText]}>{item.date}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Animated.View>

                {/* Time Selection */}
                <Animated.View entering={FadeInDown.delay(800)} style={styles.section}>
                    <View style={styles.timeGrid}>
                        {TIMES.map((time) => {
                            const isPast = selectedDate === 0 && isTimePassed(time);
                            return (
                                <TouchableOpacity
                                    key={time}
                                    disabled={isPast}
                                    style={[
                                        styles.timeSlot,
                                        selectedTime === time && styles.selectedTimeSlot,
                                        isPast && styles.disabledTimeSlot
                                    ]}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Text style={[
                                        styles.timeText,
                                        selectedTime === time && styles.selectedText,
                                        isPast && styles.disabledTimeText
                                    ]}>{time}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Animated.View>

                {/* CTA Section */}
                <Animated.View
                    entering={FadeIn.delay(900).duration(800)}
                    style={styles.ctaSection}
                >
                    <TouchableOpacity
                        style={styles.ctaButton}
                        onPress={() => navigation.navigate("Appointment", {
                            doctor: doctorData.name,
                            selectedDate: DAYS.find(d => d.id === selectedDate),
                            selectedTime: selectedTime
                        })}
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
        paddingVertical: hp(4),
        backgroundColor: "#f0f9ff",
        borderBottomLeftRadius: wp(8),
        borderBottomRightRadius: wp(8),
        marginBottom: hp(2.5),
    },
    imageWrapper: {
        width: wp(35),
        height: wp(35),
        borderRadius: wp(17.5),
        overflow: "hidden",
        borderWidth: 4,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: hp(2),
        backgroundColor: '#e2e8f0',
    },
    doctorImage: {
        width: "100%",
        height: "100%",
    },
    name: {
        fontSize: moderateScale(26),
        fontWeight: "700",
        color: "#111827",
        marginBottom: hp(0.5),
        textAlign: 'center',
    },
    specialization: {
        fontSize: moderateScale(16),
        color: "#2563eb",
        fontWeight: "600",
        marginBottom: hp(0.5),
        textAlign: 'center',
    },
    qualification: {
        fontSize: moderateScale(14),
        color: "#6b7280",
        textAlign: 'center',
    },
    content: {
        padding: wp(5),
    },
    section: {
        marginBottom: hp(3),
    },
    sectionHeader: {
        fontSize: moderateScale(20),
        fontWeight: "700",
        color: "#111827",
        marginBottom: hp(1.5),
    },
    descriptionText: {
        fontSize: moderateScale(16),
        color: "#4b5563",
        lineHeight: moderateScale(24),
    },
    dateList: {
        flexDirection: 'row',
        marginBottom: hp(1),
    },
    dateCard: {
        width: wp(16),
        height: hp(10),
        backgroundColor: '#f9fafb',
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    selectedDateCard: {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
    },
    dayText: {
        fontSize: moderateScale(14),
        color: '#6b7280',
        marginBottom: hp(0.5),
    },
    dateText: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#111827',
    },
    selectedText: {
        color: '#fff',
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeSlot: {
        width: '31%',
        paddingVertical: hp(1.5),
        backgroundColor: '#f9fafb',
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(1.5),
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    selectedTimeSlot: {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
    },
    timeText: {
        fontSize: moderateScale(14),
        color: '#4b5563',
        fontWeight: '500',
    },
    disabledTimeSlot: {
        backgroundColor: '#f3f4f6',
        borderColor: '#e5e7eb',
        opacity: 0.5,
    },
    disabledTimeText: {
        color: '#9ca3af',
    },
    ctaSection: {
        alignItems: "center",
        paddingTop: hp(1),
        marginBottom: hp(4),
    },
    ctaButton: {
        backgroundColor: "#2563eb",
        paddingVertical: hp(2.2),
        paddingHorizontal: wp(8),
        borderRadius: wp(3),
        width: "100%",
        alignItems: "center",
        shadowColor: "#2563eb",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
    },
    ctaButtonText: {
        color: "#fff",
        fontSize: moderateScale(18),
        fontWeight: "700",
    },
});
