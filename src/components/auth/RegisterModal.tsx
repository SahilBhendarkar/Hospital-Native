import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { wp, hp, moderateScale } from '../../utils/responsive';
import * as Haptics from 'expo-haptics';

interface RegisterModalProps {
    visible: boolean;
    onClose: () => void;
}

const RegisterModal = ({ visible, onClose }: RegisterModalProps) => {
    const navigation = useNavigation();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

        if (!name.trim()) {
            newErrors.name = 'Full Name is required';
            valid = false;
        }

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

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockToken = 'mock-reg-token-' + Date.now();
            const mockUser = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                email,
                role: 'patient' as const,
            };

            await login(mockToken, mockUser);
            Alert.alert('Success', 'Account created successfully!');
            onClose();
        } catch {
            Alert.alert('Error', 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = () => {
        onClose();
        navigation.navigate('Login' as never);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Create Account</Text>
                            <TouchableOpacity onPress={onClose}>
                                <MaterialCommunityIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.form}>
                                {/* Full Name */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Full Name</Text>
                                    <TextInput
                                        style={[styles.input, errors.name && styles.inputError]}
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChangeText={t => {
                                            setName(t);
                                            setErrors({ ...errors, name: '' });
                                        }}
                                    />
                                    {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                                </View>

                                {/* Email */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={[styles.input, errors.email && styles.inputError]}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={t => {
                                            setEmail(t);
                                            setErrors({ ...errors, email: '' });
                                        }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                </View>

                                {/* Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.passwordWrapper}>
                                        <TextInput
                                            style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                                            placeholder="Create a password"
                                            value={password}
                                            onChangeText={t => {
                                                setPassword(t);
                                                setErrors({ ...errors, password: '' });
                                            }}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowPassword(!showPassword)}
                                        >
                                            <MaterialCommunityIcons
                                                name={showPassword ? 'eye-off' : 'eye'}
                                                size={20}
                                                color="#666"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                </View>

                                {/* Confirm Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <TextInput
                                        style={[styles.input, errors.confirmPassword && styles.inputError]}
                                        placeholder="Repeat your password"
                                        value={confirmPassword}
                                        onChangeText={t => {
                                            setConfirmPassword(t);
                                            setErrors({ ...errors, confirmPassword: '' });
                                        }}
                                        secureTextEntry={!showPassword}
                                    />
                                    {!!errors.confirmPassword && (
                                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                    )}
                                </View>

                                {/* Register Button */}
                                <TouchableOpacity
                                    style={[styles.registerButton, loading && styles.disabledButton]}
                                    onPress={handleRegister}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.registerButtonText}>Register</Text>
                                    )}
                                </TouchableOpacity>

                                {/* Sign In Link */}
                                <View style={styles.signInContainer}>
                                    <Text style={styles.signInText}>Already have an account?</Text>
                                    <TouchableOpacity onPress={handleSignIn}>
                                        <Text style={styles.signInLink}> Sign In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        width: '100%',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        padding: wp(6),
        maxHeight: hp(85),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: '700',
    },
    form: {
        paddingBottom: hp(4),
    },
    inputGroup: {
        marginBottom: hp(2),
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        marginBottom: hp(0.8),
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e1e4e8',
        borderRadius: wp(3),
        padding: wp(4),
        fontSize: moderateScale(16),
    },
    passwordWrapper: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: wp(12),
    },
    eyeIcon: {
        position: 'absolute',
        right: wp(4),
        top: '30%',
    },
    inputError: {
        borderColor: '#ff4444',
    },
    errorText: {
        color: '#ff4444',
        fontSize: moderateScale(12),
        marginTop: hp(0.5),
    },
    registerButton: {
        backgroundColor: '#667eea',
        borderRadius: wp(3),
        padding: wp(4),
        alignItems: 'center',
        marginTop: hp(2),
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(2.5),
    },
    signInText: {
        color: '#555',
        fontSize: moderateScale(14),
    },
    signInLink: {
        color: '#667eea',
        fontSize: moderateScale(14),
        fontWeight: '700',
    },
});

export default RegisterModal;
