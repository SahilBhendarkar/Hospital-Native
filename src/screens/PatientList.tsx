import {
    FlatList,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import PatientItem from "../components/patients/PatientItem";
import { getPatients } from "../api/services/patient.service";
import type { Patient } from "../api/types";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { storage } from "../utils/storage";

const PatientList = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [page, setPage] = useState(1);
    const { isConnected } = useNetInfo();

    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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
            <Text style={styles.header}>Patients</Text>

            {!isConnected && isConnected !== null && (
                <View style={styles.offlineBanner}>
                    <Text style={styles.offlineText}>You are offline</Text>
                </View>
            )}

            <FlatList
                data={patients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PatientItem patient={item} onPress={() => { }} />
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
});
