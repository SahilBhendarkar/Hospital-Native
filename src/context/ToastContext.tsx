import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('info');
    const [visible, setVisible] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(-100))[0];

    const showToast = useCallback((msg: string, t: ToastType = 'info') => {
        setMessage(msg);
        setType(t);
        setVisible(true);

        // Trigger Haptics
        if (t === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        else if (t === 'error') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 50,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            hideToast();
        }, 3000);
    }, []);

    const hideToast = useCallback(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setVisible(false));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {visible && (
                <Animated.View
                    style={[
                        styles.toastContainer,
                        styles[type],
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <MaterialCommunityIcons
                        name={type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'information'}
                        size={24}
                        color="#fff"
                    />
                    <Text style={styles.toastText}>{message}</Text>
                    <TouchableOpacity onPress={hideToast}>
                        <MaterialCommunityIcons name="close" size={20} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    success: { backgroundColor: '#10b981' },
    error: { backgroundColor: '#ef4444' },
    info: { backgroundColor: '#3b82f6' },
    toastText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        marginLeft: 12,
    },
});
