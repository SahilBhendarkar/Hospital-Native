import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const quickLinks = [
    'Home',
    'About Us',
    'Departments',
    'Doctors',
    'Appointment',
    'Contact Us',
];

const Footer = () => {
    const [email, setEmail] = useState('');

    const openLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };

    const handleNewsletterSubmit = () => {
        if (email.trim()) {
            alert('Thank you for subscribing!');
            setEmail('');
        }
    };

    return (
        <View style={styles.footerContainer}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Links</Text>
                {quickLinks.map((link, index) => (
                    <Text key={index} style={styles.linkText}>{link}</Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <TouchableOpacity onPress={() => openLink('tel:+919099433366')}>
                    <Text style={styles.linkText}>+91 90994 33366</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('mailto:hospital@gmail.com')}>
                    <Text style={styles.linkText}>hospital@gmail.com</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Newsletter</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity style={styles.button} onPress={handleNewsletterSubmit}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.socialRow}>
                <TouchableOpacity onPress={() => openLink('https://facebook.com')}>
                    <Feather name="globe" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('https://twitter.com')}>
                    <Feather name="link" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('https://youtube.com')}>
                    <Feather name="video" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('https://wa.me/919099433366')}>
                    <Feather name="message-circle" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#111827',
        padding: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    linkText: {
        color: '#d1d5db',
        fontSize: 13,
        marginBottom: 4,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 8,
        marginBottom: 8,
        color: '#111827',
    },
    button: {
        backgroundColor: '#2563eb',
        borderRadius: 6,
        paddingVertical: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginTop: 12,
    },
});
