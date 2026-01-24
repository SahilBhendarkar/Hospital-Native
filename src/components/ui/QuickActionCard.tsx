import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface QuickActionCardProps {
    title: string;
    icon: keyof typeof Feather.glyphMap;
    colors: [string, string, ...string[]];
    onPress: () => void;
    subtitle?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
    title,
    icon,
    colors,
    onPress,
    subtitle,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <AnimatedPressable
            style={[styles.container, animatedStyle]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.iconContainer}>
                    <Feather name={icon} size={24} color="#fff" />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={styles.subtitle} numberOfLines={1}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </LinearGradient>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 120,
        borderRadius: 16,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden', 
        backgroundColor: '#fff', 
    },
    gradient: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 2,
        lineHeight: 18,
    },
    subtitle: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.8)',
    },
});

export default QuickActionCard;
