import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, moderateScale } from '../utils/responsive';
import RegisterModal from '../components/auth/RegisterModal';

const AuthChoiceScreen = () => {
    const navigation = useNavigation();
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);

    const handleLogin = () => {
        navigation.navigate('Login' as never);
    };

    const handleSignUp = () => {
        setIsRegisterVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/hospital.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.brandName}>Hospital UI</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Let's get started!</Text>
                    <Text style={styles.subtitle}>Login to Stay healthy and fit</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                        <Text style={styles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <RegisterModal
                visible={isRegisterVisible}
                onClose={() => setIsRegisterVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(10),
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: hp(6),
    },
    logo: {
        width: wp(25),
        height: wp(25),
        marginBottom: hp(1.5),
    },
    brandName: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#333',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: hp(6),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: hp(1.5),
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: '#666',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
    },
    loginButton: {
        backgroundColor: '#667eea',
        paddingVertical: hp(2),
        borderRadius: wp(8),
        alignItems: 'center',
        marginBottom: hp(2.5),
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
    },
    signupButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: hp(2),
        borderRadius: wp(8),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#667eea',
    },
    signupButtonText: {
        color: '#667eea',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
    },
});

export default AuthChoiceScreen;
