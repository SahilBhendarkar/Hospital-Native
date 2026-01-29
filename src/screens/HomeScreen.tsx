import * as Linking from "expo-linking";
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
import * as Notifications from 'expo-notifications';
import { healthStats, healthTips } from '../data/mockHealthData';
import { getAppointments } from '../api/services/appointment.service';
import { Appointment } from '../api/mock/data';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import * as Haptics from 'expo-haptics';

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
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [searchQuery, setSearchQuery] = useState('');


    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchAppointments();
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchAppointments();
        setRefreshing(false);
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
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    const triggerTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hospital Mobile 🔔",
                body: "This is a Demo Notification",
            },
            trigger: null,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

            {/* Header Section */}
            <Animated.View
                entering={FadeIn.duration(800)}
                style={styles.header}
            >
                <View style={styles.headerLeft}>
                    <View>
                        <Text style={styles.greeting}>{getGreeting()}</Text>
                        <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
                    </View>
                    <Text style={styles.dateText}>{formatDate()}</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={triggerTestNotification}
                    >
                        <View style={styles.notificationBadge} />
                        <Feather name="bell" size={24} color="#1f2937" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Profile' as any)} style={styles.profileButton}>
                        <Image
                            source={require('../../assets/contact.jpg')}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>

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
                    <SearchBar
                        placeholder="Search doctors, departments..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
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
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    navigation.navigate('Doctors');
                                }}
                            />
                        </Animated.View>
                        <Animated.View style={{ flex: 1 }} entering={FadeInDown.delay(400).springify()}>
                            <QuickActionCard
                                title="Departments"
                                icon="layers"
                                colors={['#8b5cf6', '#7c3aed']}
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    navigation.navigate('Departments');
                                }}
                            />
                        </Animated.View>
                        <Animated.View style={{ flex: 1 }} entering={FadeInDown.delay(500).springify()}>
                            <QuickActionCard
                                title="Book Appt"
                                subtitle="Schedule Now"
                                icon="calendar"
                                colors={['#10b981', '#059669']}
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                    navigation.navigate('Appointment');
                                }}
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
                        {loading ? (
                            // Skeleton states
                            [1, 2].map((_, i) => (
                                <View key={i} style={{ width: 280, marginRight: 16 }}>
                                    <SkeletonLoader height={160} width={280} borderRadius={20} />
                                </View>
                            ))
                        ) : appointments.filter(appt =>
                            appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            appt.patientName.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length > 0 ? (
                            appointments
                                .filter(appt =>
                                    appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    appt.patientName.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((appt, index) => (
                                    <Animated.View
                                        key={appt.id}
                                        entering={FadeInRight.delay(1100 + index * 100).springify()}
                                    >
                                        <UpcomingAppointmentCard
                                            doctorName={appt.doctorName}
                                            specialty="General Physician"
                                            date={new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            time={appt.time}
                                            image={require('../../assets/team/ankur.png')}
                                            onPress={() => console.log('View appointment', appt.id)}
                                            onCancel={() => console.log('Cancel appointment', appt.id)}
                                        />
                                    </Animated.View>
                                ))
                        ) : (
                            <Text style={{ color: '#666', fontStyle: 'italic', paddingHorizontal: 20 }}>
                                {searchQuery ? 'No matching appointments found' : 'No upcoming appointments'}
                            </Text>
                        )}
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


                {/*  Manual Testing of links Button  */}
                <View style={[styles.sectionContainer, styles.lastSection]}>
                    <Animated.Text
                        style={styles.sectionTitle}
                        entering={FadeIn.delay(1200)}
                    >
                        Manual Tesing of Links
                    </Animated.Text>
                    <TouchableOpacity
                        style={{
                            padding: 16,
                            backgroundColor: "#2563eb",
                            borderRadius: 8,
                            margin: 16,
                        }}
                        onPress={() => {
                            const url = Linking.createURL("/departments");
                            console.log("Opening deep link:", url);
                            Linking.openURL(url);
                        }}
                    >

                        <Text style={{ color: "#fff", textAlign: "center" }}>
                            Test Deep Link → Departments (Expo Go)
                        </Text>
                    </TouchableOpacity>
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
