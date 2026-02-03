
import React, { useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

import { wp, hp, moderateScale } from '../utils/responsive';

const teamMembers = [
    {
        id: '1',
        name: 'Dr. Rajiv Pandya',
        specialty: 'Orthopedic Surgeon',
        image: require('../../assets/team/ankur.png'),
    },
    {
        id: '2',
        name: 'Dr. Ankur Chaudhari',
        specialty: 'Cardiologist',
        image: require('../../assets/team/hiren.png'),
    },
    {
        id: '3',
        name: 'Dr. Nainesh Patel',
        specialty: 'Neurologist',
        image: require('../../assets/team/nainesh.png'),
    },
    {
        id: '4',
        name: 'Dr. Priya Singh',
        specialty: 'General Physician',
        image: require('../../assets/team/rajiv.png'),
    },
];

const TeamCard = ({ member }: { member: typeof teamMembers[0] }) => (
    <View style={styles.teamCard}>
        <Image source={member.image} style={styles.teamImage} />
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.specialty}>{member.specialty}</Text>
    </View>
);

import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const OurTeam = () => {
    const renderTeamMember = ({ item, index }: { item: typeof teamMembers[0], index: number }) => (
        <Animated.View entering={FadeInDown.delay(index * 150).duration(600).springify()}>
            <TeamCard member={item} />
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <Animated.View entering={FadeInUp.duration(800)}>
                    <Text style={styles.title}>OUR TEAMS</Text>
                </Animated.View>
            </View>

            <View style={styles.cardsContainer}>
                <FlatList
                    data={teamMembers}
                    renderItem={renderTeamMember}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    scrollEnabled={false}
                />
            </View>

            <Animated.View entering={FadeInDown.delay(1000).duration(600)}>
                <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllButtonText}>View All</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2a3de4',
        paddingVertical: hp(3),
        paddingHorizontal: wp(4),
    },
    headerSection: {
        position: 'relative',
        paddingBottom: hp(4),
    },
    headerBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1e3a8a',
        borderBottomLeftRadius: wp(25),
        borderBottomRightRadius: wp(25),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        zIndex: 1,
    },
    cardsContainer: {
        marginBottom: hp(3),
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: hp(2),
    },
    teamCard: {
        width: wp(44),
        backgroundColor: '#fff',
        borderRadius: wp(3),
        overflow: 'hidden',
        alignItems: 'center',
        paddingVertical: hp(2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    teamImage: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        marginBottom: hp(1.5),
    },
    memberName: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#1e3a8a',
        marginBottom: hp(0.5),
    },
    specialty: {
        fontSize: moderateScale(12),
        color: '#666',
        textAlign: 'center',
    },
    viewAllButton: {
        backgroundColor: '#2563eb',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(8),
        borderRadius: wp(1.5),
        alignSelf: 'center',
        marginBottom: hp(2),
    },
    viewAllButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: moderateScale(14),
    },
});

export default OurTeam;
