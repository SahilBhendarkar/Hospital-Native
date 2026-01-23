import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface UpcomingAppointmentCardProps {
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    image?: any;
    onPress?: () => void;
    onCancel?: () => void;
}

const UpcomingAppointmentCard: React.FC<UpcomingAppointmentCardProps> = ({
    doctorName,
    specialty,
    date,
    time,
    image,
    onPress,
    onCancel,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.98);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <AnimatedPressable
            style={[styles.container, animatedStyle]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <View style={styles.header}>
                <View style={styles.doctorInfo}>
                    <Image
                        source={image || require('../../../assets/team/Ankur.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{doctorName}</Text>
                        <Text style={styles.specialty}>{specialty}</Text>
                    </View>
                </View>
                <View style={styles.moreButton}>
                    <Feather name="more-vertical" size={20} color="#9ca3af" />
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.scheduleContainer}>
                <View style={styles.scheduleItem}>
                    <Feather name="calendar" size={14} color="#6b7280" style={styles.icon} />
                    <Text style={styles.scheduleText}>{date}</Text>
                </View>
                <View style={styles.scheduleItem}>
                    <Feather name="clock" size={14} color="#6b7280" style={styles.icon} />
                    <Text style={styles.scheduleText}>{time}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Pressable
                    style={({ pressed }) => [
                        styles.cancelButton,
                        { opacity: pressed ? 0.8 : 1 }
                    ]}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.rescheduleButton,
                        { opacity: pressed ? 0.8 : 1 }
                    ]}
                    onPress={onPress}
                >
                    <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                </Pressable>
            </View>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        width: 280,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e5e7eb',
    },
    textContainer: {
        marginLeft: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    specialty: {
        fontSize: 12,
        color: '#6b7280',
    },
    moreButton: {
        padding: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginVertical: 12,
    },
    scheduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#f9fafb',
        padding: 8,
        borderRadius: 8,
    },
    scheduleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    icon: {
        marginRight: 6,
    },
    scheduleText: {
        fontSize: 12,
        color: '#4b5563',
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 8,
        backgroundColor: '#fef2f2',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ef4444',
    },
    rescheduleButton: {
        flex: 1,
        paddingVertical: 8,
        marginLeft: 8,
        borderRadius: 8,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
    },
    rescheduleButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#3b82f6',
    },
});

export default UpcomingAppointmentCard;
