import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

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
                    <Feather name="user" size={60} color="white" />
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
                            <Feather name={item.icon as any} size={20} color="#667eea" />
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
                    <Feather name="edit-2" size={20} color="white" />
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={logout}
                >
                    <Feather name="log-out" size={20} color="#ef4444" />
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
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginVertical: 30,
    },
    avatarGradient: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
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
        fontSize: 24,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
        letterSpacing: 1.2,
    },
    section: {
        marginBottom: 30,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
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
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#64748b',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1e293b',
    },
    actions: {
        gap: 12,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#667eea',
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fecaca',
        gap: 8,
    },
    logoutButtonText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: '600',
    },
});
