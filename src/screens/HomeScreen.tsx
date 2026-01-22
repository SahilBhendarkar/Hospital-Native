import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IndexSlider from './IndexSlider';
import OurTeam from './OurTeam';
import PatientReview from './PatientReview';
import Footer from '../components/layout/Footer';
import Services from './Services';

import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/auth/LoginModal';

const HomeScreen = () => {
    const { user, logout } = useAuth();
    const [loginVisible, setLoginVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hospital App</Text>
                {user ? (
                    <TouchableOpacity onPress={logout} style={styles.authButton}>
                        <Text style={styles.authButtonText}>Logout ({user.name})</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setLoginVisible(true)} style={styles.authButton}>
                        <Text style={styles.authButtonText}>Login</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <IndexSlider />
                <OurTeam />
                <Services />
                <PatientReview />
                <Footer />
            </ScrollView>

            <LoginModal visible={loginVisible} onClose={() => setLoginVisible(false)} />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    authButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        borderRadius: 6,
    },
    authButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563eb',
    },
});
