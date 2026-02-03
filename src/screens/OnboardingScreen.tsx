import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, moderateScale } from '../utils/responsive';

interface OnboardingProps {
    route: {
        params: {
            step: number;
        };
    };
}

const ONBOARDING_DATA = [
    {
        title: 'Find a lot of specialist doctors in one place',
        image: require('../../assets/team/ankur.png'),
        description: 'Connect with top-rated specialists for comprehensive care.',
        buttonText: 'Next',
    },
    {
        title: 'Get advice only from a doctor you believe in.',
        image: require('../../assets/team/hiren.png'),
        description: 'Quality healthcare starts with trust and expertise.',
        buttonText: 'Get Started',
    },
];

const OnboardingScreen: React.FC<OnboardingProps> = ({ route }) => {
    const navigation = useNavigation();
    const step = route.params?.step || 1;
    const data = ONBOARDING_DATA[step - 1];

    const handleNext = () => {
        if (step < ONBOARDING_DATA.length) {
            (navigation.navigate as any)('Onboarding', { step: step + 1 });
        } else {
            navigation.navigate('AuthChoice' as never);
        }
    };

    const handleSkip = () => {
        navigation.navigate('AuthChoice' as never);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <Image source={data.image} style={styles.image} resizeMode="contain" />

                <View style={styles.footer}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.description}>{data.description}</Text>

                    <View style={styles.pagination}>
                        <View style={[styles.dot, step === 1 && styles.activeDot]} />
                        <View style={[styles.dot, step === 2 && styles.activeDot]} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>{data.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    skipButton: {
        alignSelf: 'flex-end',
        padding: wp(5),
    },
    skipText: {
        fontSize: moderateScale(16),
        color: '#9E9E9E',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: wp(80),
        height: hp(40),
        marginBottom: hp(4),
    },
    footer: {
        paddingHorizontal: wp(8),
        alignItems: 'center',
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: hp(2),
    },
    description: {
        fontSize: moderateScale(16),
        textAlign: 'center',
        color: '#666',
        lineHeight: moderateScale(24),
        marginBottom: hp(3.5),
    },
    pagination: {
        flexDirection: 'row',
        marginBottom: hp(3.5),
    },
    dot: {
        width: wp(2),
        height: wp(2),
        borderRadius: wp(1),
        backgroundColor: '#E0E0E0',
        marginHorizontal: wp(1),
    },
    activeDot: {
        backgroundColor: '#667eea',
        width: wp(5),
    },
    button: {
        backgroundColor: '#667eea',
        paddingVertical: hp(2),
        paddingHorizontal: wp(15),
        borderRadius: wp(10),
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(18),
        fontWeight: '600',
    },
});

export default OnboardingScreen;
