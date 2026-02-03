import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

import { wp, hp, moderateScale } from '../utils/responsive';

const Profile = () => {
    const { user, logout } = useAuth();

    const profileItems = [
        { icon: 'mail', label: 'Email', value: user?.email || 'Not available' },
        { icon: 'phone', label: 'Phone', value: '+91 9356595332' },
        { icon: 'map-pin', label: 'Address', value: 'Samta Nagar, Sawangi (M) , Wardha' },
        { icon: 'shield', label: 'Role', value: user?.role || 'Patient' },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Animated.View
                entering={FadeInDown.duration(600).springify()}
                style={styles.header}
            >
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.avatarGradient}
                >
                    <Feather name="user" size={wp(15)} color="white" />
                </LinearGradient>
                <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
                <Text style={styles.role}>{user?.role?.toUpperCase() || 'PATIENT'}</Text>
            </Animated.View>

            <View style={styles.section}>
                {profileItems.map((item, index) => (
                    <Animated.View
                        key={item.label}
                        entering={FadeInRight.delay(200 + index * 100).duration(500)}
                        style={styles.infoCard}
                    >
                        <View style={styles.infoIcon}>
                            <Feather name={item.icon as any} size={moderateScale(20)} color="#667eea" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>{item.label}</Text>
                            <Text style={styles.infoValue}>{item.value}</Text>
                        </View>
                    </Animated.View>
                ))}
            </View>

            <Animated.View
                entering={FadeInDown.delay(800).duration(500)}
                style={styles.actions}
            >
                <TouchableOpacity style={styles.editButton}>
                    <Feather name="edit-2" size={moderateScale(20)} color="white" />
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={logout}
                >
                    <Feather name="log-out" size={moderateScale(20)} color="#ef4444" />
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </Animated.View>
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: wp(5),
    },
    header: {
        alignItems: 'center',
        marginVertical: hp(4),
    },
    avatarGradient: {
        width: wp(30),
        height: wp(30),
        borderRadius: wp(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    name: {
        fontSize: moderateScale(24),
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: hp(0.5),
    },
    role: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#64748b',
        letterSpacing: 1.2,
    },
    section: {
        marginBottom: hp(4),
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: wp(4),
        borderRadius: wp(4),
        marginBottom: hp(1.5),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    infoIcon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(2.5),
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4),
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: moderateScale(12),
        color: '#64748b',
        marginBottom: hp(0.3),
    },
    infoValue: {
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: '#1e293b',
    },
    actions: {
        gap: hp(1.5),
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#667eea',
        padding: wp(4),
        borderRadius: wp(3),
        gap: wp(2),
    },
    editButtonText: {
        color: 'white',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        padding: wp(4),
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: '#fecaca',
        gap: wp(2),
    },
    logoutButtonText: {
        color: '#ef4444',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
});
