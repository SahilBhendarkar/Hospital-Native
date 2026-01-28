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
import { useEffect, useState } from "react";
import PatientItem from "../components/patients/PatientItem";
import { getPatients } from "../api/services/patient.service";
import type { Patient } from "../api/types";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { storage } from "../utils/storage";
import Animated, { FadeInDown, FadeIn, ZoomIn } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

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
                    setHasMore(false); // No pagination in offline mode for now
                }
            }
            setInitialLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
            return;
        }

        // Artificial delay removed or kept based on preference, keeping for consistency but reducing
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

    const handleLongPress = (patient: Patient) => {
        setSelectedPatient(patient);
        setShowActions(true);
    };

    const closeActions = () => {
        setShowActions(false);
        setSelectedPatient(null);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        setHasMore(true);
        await loadPatients(1, true);
        setRefreshing(false);
    };

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
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <Animated.View entering={FadeIn.delay(index * 100).duration(400)}>
                        <PatientItem
                            patient={item}
                            onPress={() => { }}
                            onLongPress={() => handleLongPress(item)}
                        />
                    </Animated.View>
                )}
                onEndReached={() => loadPatients(page)}
                onEndReachedThreshold={0.6}
                refreshing={refreshing}
                onRefresh={onRefresh}

                ListFooterComponent={
                    loadingMore ? (
                        <ActivityIndicator
                            size="small"
                            style={{ marginVertical: 16 }}
                        />
                    ) : null
                }

                showsVerticalScrollIndicator={false}
            />

            {/* Quick Action Modal */}
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
                                    <Feather name="phone" size={24} color="#fff" />
                                </View>
                                <Text style={styles.actionLabel}>Call</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionItem} onPress={() => {
                                Alert.alert("Message", `Opening chat for ${selectedPatient?.name}`);
                                closeActions();
                            }}>
                                <View style={[styles.iconBg, { backgroundColor: '#3b82f6' }]}>
                                    <Feather name="message-square" size={24} color="#fff" />
                                </View>
                                <Text style={styles.actionLabel}>Message</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionItem} onPress={() => {
                                Alert.alert("Info", `Showing details for ${selectedPatient?.name}`);
                                closeActions();
                            }}>
                                <View style={[styles.iconBg, { backgroundColor: '#8b5cf6' }]}>
                                    <Feather name="user" size={24} color="#fff" />
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

export default PatientList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f8",
        paddingHorizontal: 12,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        marginVertical: 16,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    offlineBanner: {
        backgroundColor: '#ff3b30',
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    offlineText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionMenu: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 10,
    },
    actionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 20,
    },
    actionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    actionItem: {
        alignItems: 'center',
        gap: 8,
    },
    iconBg: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
});
