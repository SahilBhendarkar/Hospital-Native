import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    Animated,
    FlatList,
    StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const heroSlides = [
    {
        image: require('../../assets/slider/slider1.png'),
        title: 'Advanced Medical Care',
        subtitle: 'World Class Healthcare',
        description:
            'Experience exceptional healthcare services delivered with compassion and expertise.',
    },
    {
        image: require('../../assets/slider/slider2.png'),
        title: 'Expert Doctors',
        subtitle: 'Specialized Care',
        description:
            'Our team of experienced medical professionals is dedicated to your health.',
    },
];

const IndexSlider = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % heroSlides.length;

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderSlide = ({ item }: { item: typeof heroSlides[0] }) => (
        <View style={[styles.slide, { width }]}>
            <Image source={item.image} style={styles.slideImage} />
            <View style={styles.overlay} />
            <View style={styles.content}>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={heroSlides}
                renderItem={renderSlide}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />
        </View>
    );
};  
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height * 0.6,
        backgroundColor: '#f9fafb',
    },
    slide: {
        position: 'relative',
        height: height * 0.6,
    },
    slideImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.85,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    title: {
        fontSize: 36,
        color: '#fff',
        fontWeight: '900',
        marginBottom: 16,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 6,
    },
    description: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        maxWidth: '80%',
        lineHeight: 22,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
});

export default IndexSlider;
