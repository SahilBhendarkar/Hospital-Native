import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IndexSlider from './IndexSlider';
import OurTeam from './OurTeam';
import PatientReview from './PatientReview';
import Footer from '../components/layout/Footer';
import Services from './Services';

const HomeScreen = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <IndexSlider />
                <OurTeam />
                <Services />
                <PatientReview />
                <Footer />
            </ScrollView>

            <Modal visible={showLoginModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Login to Hospital</Text>

                        <TouchableOpacity
                            style={styles.loginButtonModal}
                            onPress={() => setShowLoginModal(false)}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowLoginModal(false)}
                        >
                            <Text style={styles.closeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
    },
    loginButtonModal: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
    closeButton: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        paddingVertical: 12,
    },
    closeButtonText: {
        textAlign: 'center',
        color: '#6b7280',
    },
});
