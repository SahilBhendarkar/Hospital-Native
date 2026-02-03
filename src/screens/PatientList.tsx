import {
    FlatList,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import PatientItem from "../components/patients/PatientItem";
import { getPatients } from "../api/services/patient.service";
import type { Patient } from "../api/types";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { storage } from "../utils/storage";
import Animated, { FadeInDown, FadeIn, ZoomIn } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { wp, hp, moderateScale } from "../utils/responsive";

const PatientList = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [page, setPage] = useState(1);
    const { isConnected } = useNetInfo();

    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showActions, setShowActions] = useState(false);

    useEffect(() => {
        loadPatients(1, true);
    }, []);

    const loadPatients = async (pageNo: number, refresh = false) => {
        if (loadingMore || (!hasMore && !refresh)) return;

        if (pageNo === 1 && !refresh) {
            setInitialLoading(true);
        } else {
            setLoadingMore(true);
        }

        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            if (pageNo === 1) {
                const cachedData = await storage.load('patients_cache');
                if (cachedData) {
                    setPatients(cachedData);
                    setHasMore(false);
                }
            }
            setInitialLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const data = await getPatients(pageNo);

            if (data.length === 0) {
                setHasMore(false);
            } else {
                setPatients(prev =>
                    refresh ? data : [...prev, ...data]
                );
                setPage(pageNo + 1);

                if (refresh || pageNo === 1) {
                    storage.save('patients_cache', data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch patients", error);
        }

        setInitialLoading(false);
        setLoadingMore(false);
    };

    const handleLongPress = React.useCallback((patient: Patient) => {
        setSelectedPatient(patient);
        setShowActions(true);
    }, []);

    const closeActions = React.useCallback(() => {
        setShowActions(false);
        setSelectedPatient(null);
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        setHasMore(true);
        await loadPatients(1, true);
        setRefreshing(false);
    }, [loadPatients]);

    const renderItem = React.useCallback(({ item, index }: { item: Patient; index: number }) => (
        <Animated.View entering={FadeIn.delay(index % 10 * 100).duration(400)}>
            <PatientItem
                patient={item}
                onPress={() => { }}
                onLongPress={() => handleLongPress(item)}
            />
        </Animated.View>
    ), [handleLongPress]);

    const keyExtractor = React.useCallback((item: Patient) => item.id, []);

    const getItemLayout = React.useCallback((_: any, index: number) => ({
        length: hp(10), // Approximate height of PatientItem
        offset: hp(10) * index,
        index,
    }), []);

    if (initialLoading && patients.length === 0) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.Text entering={FadeInDown.duration(600)} style={styles.header}>Patients</Animated.Text>

            {!isConnected && isConnected !== null && (
                <View style={styles.offlineBanner}>
                    <Text style={styles.offlineText}>You are offline</Text>
                </View>
            )}

            <FlatList
                data={patients}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContent}
                renderItem={renderItem}
                onEndReached={() => loadPatients(page)}
                onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={onRefresh}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                getItemLayout={getItemLayout}
                removeClippedSubviews={true}
                ListFooterComponent={
                    loadingMore ? (
                        <ActivityIndicator
                            size="small"
                            style={{ marginVertical: hp(2) }}
                        />
                    ) : null
                }
                showsVerticalScrollIndicator={false}
            />

            <Modal
                visible={showActions}
                transparent
                animationType="fade"
                onRequestClose={closeActions}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={closeActions}
                >
                    <Animated.View
                        entering={ZoomIn.duration(300)}
                        style={styles.actionMenu}
                    >
                        <Text style={styles.actionTitle}>{selectedPatient?.name}</Text>
                        <Text style={styles.actionSubtitle}>{selectedPatient?.condition}</Text>

                        <View style={styles.actionGrid}>
                            <TouchableOpacity style={styles.actionItem} onPress={() => {
                                Alert.alert("Calling", `Initiating call to ${selectedPatient?.name}`);
                                closeActions();
                            }}>
                                <View style={[styles.iconBg, { backgroundColor: '#10b981' }]}>
                                    <Feather name="phone" size={moderateScale(24)} color="#fff" />
                                </View>
                                <Text style={styles.actionLabel}>Call</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionItem} onPress={() => {
                                Alert.alert("Message", `Opening chat for ${selectedPatient?.name}`);
                                closeActions();
                            }}>
                                <View style={[styles.iconBg, { backgroundColor: '#3b82f6' }]}>
                                    <Feather name="message-square" size={moderateScale(24)} color="#fff" />
                                </View>
                                <Text style={styles.actionLabel}>Message</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionItem} onPress={() => {
                                Alert.alert("Info", `Showing details for ${selectedPatient?.name}`);
                                closeActions();
                            }}>
                                <View style={[styles.iconBg, { backgroundColor: '#8b5cf6' }]}>
                                    <Feather name="user" size={moderateScale(24)} color="#fff" />
                                </View>
                                <Text style={styles.actionLabel}>Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f8",
    },
    listContent: {
        paddingHorizontal: wp(3),
        paddingBottom: hp(2),
    },
    header: {
        fontSize: moderateScale(26),
        fontWeight: "700",
        textAlign: "center",
        marginVertical: hp(2),
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    offlineBanner: {
        backgroundColor: '#ff3b30',
        paddingVertical: hp(1.2),
        marginHorizontal: wp(3),
        marginBottom: hp(1.2),
        borderRadius: wp(2),
        alignItems: 'center',
    },
    offlineText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionMenu: {
        width: wp(80),
        backgroundColor: '#fff',
        borderRadius: wp(6),
        padding: wp(6),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp(1) },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 10,
    },
    actionTitle: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: '#111827',
        marginBottom: hp(0.5),
    },
    actionSubtitle: {
        fontSize: moderateScale(14),
        color: '#6b7280',
        marginBottom: hp(2.5),
    },
    actionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: hp(1),
    },
    actionItem: {
        alignItems: 'center',
        gap: hp(1),
    },
    iconBg: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionLabel: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: '#374151',
    },
});

export default PatientList;
