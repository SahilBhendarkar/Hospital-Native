import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, DimensionValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SkeletonLoaderProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: any;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    width = '100%',
    height = 20,
    borderRadius = 8,
    style
}) => {
    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width as any, width as any], // Cast width for animation interpolation
    });

    return (
        <View
            style={[
                styles.skeleton,
                { width, height, borderRadius },
                style
            ]}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#e2e8f0',
        overflow: 'hidden',
    },
});

export default SkeletonLoader;
