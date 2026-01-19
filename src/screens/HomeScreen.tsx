import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import TextCustom from '../components/ui/TextCustom';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#3498db" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Header title="Hospital Management" />

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <Card style={styles.statCard}>
                        <TextCustom variant="h2" style={styles.statNumber}>
                            10
                        </TextCustom>
                        <TextCustom variant="body">Patients Today</TextCustom>
                    </Card>

                    <Card style={styles.statCard}>
                        <TextCustom variant="h2" style={styles.statNumber}>
                            8
                        </TextCustom>
                        <TextCustom variant="body">Appointments</TextCustom>
                    </Card>
                </View>

                {/* Quick Actions */}
                <Card>
                    <TextCustom variant="h2" style={styles.sectionTitle}>
                        Quick Actions
                    </TextCustom>

                    <View style={styles.actionsGrid}>
                        <View style={styles.actionItem}>
                            <TextCustom variant="h2" style={styles.statNumber}>
                                3
                            </TextCustom>
                            <TextCustom style={styles.actionLabel}>
                                Doctors Available
                            </TextCustom>
                        </View>

                        <View style={styles.actionItem}>
                            <TextCustom variant="h2" style={styles.statNumber}>
                                8
                            </TextCustom>
                            <TextCustom style={styles.actionLabel}>
                                Patients Admitted
                            </TextCustom>
                        </View>

                        <View style={styles.actionItem}>
                            <TextCustom variant="h2" style={styles.statNumber}>
                                8
                            </TextCustom>
                            <TextCustom style={styles.actionLabel}>
                                Appointments Today
                            </TextCustom>
                        </View>

                        <View style={styles.actionItem}>
                            <TextCustom variant="h2" style={styles.statNumber}>
                                5
                            </TextCustom>
                            <TextCustom style={styles.actionLabel}>
                                Beds Available
                            </TextCustom>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },

    container: {
        flex: 1,
    },

    contentContainer: {
        paddingBottom: 24,
    },

    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 24,
        gap: 12,
    },

    statCard: {
        flex: 1,
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statNumber: {
        marginBottom: 6,
    },

    sectionTitle: {
        marginBottom: 16,
    },

    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    actionItem: {
        flexBasis: '48%',
        aspectRatio: 1,
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        elevation: 2,
    },

    actionLabel: {
        textAlign: 'center',
        marginTop: 6,
        lineHeight: 20,
    },
});

