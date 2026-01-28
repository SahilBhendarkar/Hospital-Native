import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
    const navigation = useNavigation();
    const { token, isLoading } = useAuth();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            if (!isLoading) {
                if (token) {
                    // User is authenticated, go to main app
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' as never }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' as never }],
                    });
                }
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [isLoading, token, navigation, fadeAnim, scaleAnim]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image
                    source={require('../../assets/images/hospital.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>HOSPITAL APP</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#667eea',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    logo: {
        width: width * 0.6,
        height: height * 0.3,
        maxWidth: 300,
        maxHeight: 300,
        marginBottom: 24,
    },
    appName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 2,
        textAlign: 'center',
    },
});

export default LoadingScreen;
