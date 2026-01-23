import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight, FadeIn } from 'react-native-reanimated';

import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/ui/SearchBar';
import QuickActionCard from '../components/ui/QuickActionCard';
import StatCard from '../components/ui/StatCard';
import UpcomingAppointmentCard from '../components/ui/UpcomingAppointmentCard';
import HealthTipCard from '../components/ui/HealthTipCard';

import { healthStats, upcomingAppointments, healthTips } from '../data/mockHealthData';

type RootStackParamList = {
    Doctors: undefined;
    Departments: undefined;
    Appointment: undefined;
    DepartmentDetails: { departmentId: string };
    Login: undefined;
};

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user, logout } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const handleSearch = (text: string) => {
        console.log('Searching for:', text);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning,';
        if (hour < 18) return 'Good Afternoon,';
        return 'Good Evening,';
    };

    const formatDate = () => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View>
                        <Text style={styles.greeting}>{getGreeting()}</Text>
                        <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
                    </View>
                    <Text style={styles.dateText}>{formatDate()}</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <View style={styles.notificationBadge} />
                        <Feather name="bell" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout} style={styles.profileButton}>
                        <Image
                            source={require('../../assets/contact.jpg')}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#667eea']} />
                }
            >
                {/* Search Bar */}
                <Animated.View
                    style={styles.searchContainer}
                    entering={FadeInDown.delay(100).springify()}
                >
                    <SearchBar onSearch={handleSearch} />
                </Animated.View>

                {/* Quick Actions */}
                <View style={styles.sectionContainer}>
                    <Animated.Text
                        style={styles.sectionTitle}
                        entering={FadeIn.delay(200)}
                    >
                        Quick Actions
                    </Animated.Text>
                    <View style={styles.quickActionsGrid}>
                        <Animated.View style={{ flex: 1 }} entering={FadeInDown.delay(300).springify()}>
                            <QuickActionCard
                                title="Find Doctors"
                                icon="users"
                                colors={['#3b82f6', '#2563eb']}
                                onPress={() => navigation.navigate('Doctors')}
                            />
                        </Animated.View>
                        <Animated.View style={{ flex: 1 }} entering={FadeInDown.delay(400).springify()}>
                            <QuickActionCard
                                title="Departments"
                                icon="layers"
                                colors={['#8b5cf6', '#7c3aed']}
                                onPress={() => navigation.navigate('Departments')}
                            />
                        </Animated.View>
                        <Animated.View style={{ flex: 1 }} entering={FadeInDown.delay(500).springify()}>
                            <QuickActionCard
                                title="Book Appt"
                                subtitle="Schedule Now"
                                icon="calendar"
                                colors={['#10b981', '#059669']}
                                onPress={() => navigation.navigate('Appointment')}
                            />
                        </Animated.View>
                    </View>
                </View>

                {/* Health Overview */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Animated.Text style={styles.sectionTitle} entering={FadeIn.delay(1000)}>Health Overview</Animated.Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See Detail</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.statsGrid}>
                        {healthStats.map((stat, index) => (
                            <Animated.View
                                key={stat.id}
                                style={{ width: '48%' }}
                                entering={FadeInDown.delay(700 + index * 100).springify()}
                            >
                                <StatCard
                                    label={stat.label}
                                    value={stat.value}
                                    unit={stat.unit}
                                    icon={stat.icon as any}
                                    trend={stat.trend as any}
                                    trendValue={stat.trendValue}
                                    status={stat.status as any}
                                    color={stat.color}
                                />
                            </Animated.View>
                        ))}
                    </View>
                </View>

                {/* Upcoming Appointments */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Animated.Text style={styles.sectionTitle} entering={FadeIn.delay(1000)}>Upcoming Appointments</Animated.Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScrollContent}
                    >
                        {upcomingAppointments.map((appt, index) => (
                            <Animated.View
                                key={appt.id}
                                entering={FadeInRight.delay(1100 + index * 100).springify()}
                            >
                                <UpcomingAppointmentCard
                                    doctorName={appt.doctorName}
                                    specialty={appt.specialty}
                                    date={appt.date}
                                    time={appt.time}
                                    image={appt.image}
                                    onPress={() => console.log('View appointment', appt.id)}
                                    onCancel={() => console.log('Cancel appointment', appt.id)}
                                />
                            </Animated.View>
                        ))}
                    </ScrollView>
                </View>

                {/* Health Tips */}
                <View style={[styles.sectionContainer, styles.lastSection]}>
                    <Animated.Text style={styles.sectionTitle} entering={FadeIn.delay(1400)}>Daily Health Tips</Animated.Text>
                    {healthTips.map((tip, index) => (
                        <Animated.View
                            key={tip.id}
                            entering={FadeInDown.delay(1500 + index * 100).duration(600)}
                        >
                            <HealthTipCard
                                title={tip.title}
                                description={tip.description}
                                category={tip.category}
                                icon={tip.icon as any}
                                colors={tip.colors as any}
                            />
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 16,
        backgroundColor: '#fff',
    },
    headerLeft: {
        flex: 1,
    },
    greeting: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 2,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 12,
        color: '#667eea',
        fontWeight: '500',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 1,
        borderColor: '#fff',
        zIndex: 1,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },

    scrollContent: {
        paddingBottom: 32,
    },

    searchContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: 24,
    },

    sectionContainer: {
        marginBottom: 28,
        paddingHorizontal: 20,
    },
    lastSection: {
        marginBottom: 48,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 14,

    },
    seeAllText: {
        fontSize: 14,
        color: '#667eea',
        fontWeight: '600',
    },

    quickActionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 16,
    },

    horizontalScrollContent: {
        paddingRight: 20,
    },
});


export default HomeScreen;
