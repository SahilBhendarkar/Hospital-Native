import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import { useToast } from '../context/ToastContext';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { wp, hp, moderateScale } from '../utils/responsive';

import RegisterModal from '../components/auth/RegisterModal';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useAuth();
    const { showToast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await loginUser(email, password);
            await login(response.token, response.user);
            showToast(`Welcome back, ${response.user.name}!`, 'success');

        } catch (error) {
            showToast(
                error instanceof Error
                    ? error.message
                    : 'Invalid credentials. Please try again.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Animated.View
                    entering={FadeInUp.duration(800).springify()}
                    style={styles.logoContainer}
                >
                    <Image
                        source={require('../../assets/images/hospital.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Hospital Management</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(400).duration(800).springify()}
                    style={styles.formContainer}
                >
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email ? styles.inputError : null]}
                            placeholder="Enter your email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors({ ...errors, email: '' });
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!loading}
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, styles.passwordInput, errors.password ? styles.inputError : null]}
                                placeholder="Enter your password"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrors({ ...errors, password: '' });
                                }}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>

                    <TouchableOpacity
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            handleLogin();
                        }}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => setIsRegisterVisible(true)}>
                            <Text style={styles.signupLink}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>

            <RegisterModal
                visible={isRegisterVisible}
                onClose={() => setIsRegisterVisible(false)}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: wp(6),
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: hp(4),
    },
    logo: {
        width: wp(30),
        height: wp(30),
        marginBottom: hp(2),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: hp(1),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: '#666',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: wp(4),
        padding: wp(6),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    inputContainer: {
        marginBottom: hp(2.5),
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#333',
        marginBottom: hp(1),
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e1e4e8',
        borderRadius: wp(3),
        padding: wp(4),
        fontSize: moderateScale(16),
        color: '#1a1a1a',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
        paddingRight: wp(12),
    },
    eyeIcon: {
        position: 'absolute',
        right: wp(4),
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    inputError: {
        borderColor: '#ff4444',
    },
    errorText: {
        color: '#ff4444',
        fontSize: moderateScale(12),
        marginTop: hp(0.5),
    },
    loginButton: {
        backgroundColor: '#667eea',
        borderRadius: wp(3),
        padding: wp(4),
        alignItems: 'center',
        marginTop: hp(1),
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonDisabled: {
        backgroundColor: '#a0a0a0',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(3),
    },
    signupText: {
        fontSize: moderateScale(14),
        color: '#666',
    },
    signupLink: {
        fontSize: moderateScale(14),
        color: '#667eea',
        fontWeight: '600',
    },
});

export default LoginScreen;