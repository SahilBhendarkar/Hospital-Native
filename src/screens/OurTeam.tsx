
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

const { width } = Dimensions.get('window');

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
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    headerSection: {
        position: 'relative',
        paddingBottom: 32,
    },
    headerBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1e3a8a',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        zIndex: 1,
    },
    cardsContainer: {
        marginBottom: 24,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    teamCard: {
        width: (width - 48) / 2,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    teamImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    memberName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e3a8a',
        marginBottom: 4,
    },
    specialty: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    viewAllButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        alignSelf: 'center',
        marginBottom: 16,
    },
    viewAllButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default OurTeam;
