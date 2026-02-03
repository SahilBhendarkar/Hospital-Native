
import React, { useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    Dimensions,
    StyleSheet,
    FlatList,
} from 'react-native';

import { wp, hp, moderateScale } from '../utils/responsive';

const reviews = [
    {
        id: '1',
        name: 'Mrs. Sunita Sharma',
        date: '12 Jan 2026',
        rating: 5,
        review:
            'The doctors and staff were extremely supportive. The treatment was explained clearly and the care provided was excellent. I am very satisfied with the services.',
    },
    {
        id: '2',
        name: 'Mr. Rajesh Patil',
        date: '05 Jan 2026',
        rating: 4,
        review:
            'Very clean hospital with well-trained doctors. The appointment process was smooth and the staff was polite throughout my visit.',
    },
    {
        id: '3',
        name: 'Ms. Neha Kulkarni',
        date: '28 Dec 2025',
        rating: 3,
        review:
            'I had a great experience. The doctors were knowledgeable and the nursing staff was very caring. Highly recommended hospital.',
    },
];

const StarRating = ({ rating }: { rating: number }) => (
    <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }).map((_, i) => (
            <Text
                key={i}
                style={[
                    styles.star,
                    {
                        color: i < rating ? '#facc15' : '#d1d5db',
                    },
                ]}
            >
                ★
            </Text>
        ))}
    </View>
);

const ReviewCard = ({ item, index }: { item: typeof reviews[0]; index: number }) => {
    const cardOpacity = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(cardOpacity, {
            toValue: 1,
            duration: 700,
            delay: index * 200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.reviewCard,
                {
                    opacity: cardOpacity,
                },
            ]}
        >
            <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{item.name}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
            </View>

            <StarRating rating={item.rating} />

            <Text style={styles.reviewText}>{item.review}</Text>
        </Animated.View>
    );
};

const PatientReview = () => {
    const titleOpacity = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: titleOpacity }}>
                <Text style={styles.title}>Patient Reviews</Text>
            </Animated.View>

            <FlatList
                data={reviews}
                renderItem={({ item, index }) => <ReviewCard item={item} index={index} />}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.reviewsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingVertical: hp(3),
        paddingHorizontal: wp(4),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: '700',
        textAlign: 'center',
        color: '#1e3a8a',
        marginBottom: hp(3),
    },
    reviewsList: {
        gap: hp(2),
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: wp(4),
        padding: wp(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    reviewHeader: {
        marginBottom: hp(1.5),
    },
    reviewerName: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#1e40af',
        marginBottom: hp(0.5),
    },
    reviewDate: {
        fontSize: moderateScale(12),
        color: '#999',
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: wp(1),
        marginBottom: hp(1.5),
    },
    star: {
        fontSize: moderateScale(16),
    },
    reviewText: {
        fontSize: moderateScale(13),
        color: '#4b5563',
        lineHeight: moderateScale(20),
    },
});

export default PatientReview;
