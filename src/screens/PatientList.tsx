import {
    FlatList,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import PatientItem from "../components/patients/PatientItem";
import { getPatients } from "../data/patient";
import type { Patient } from "../data/patient";

const PatientList = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        loadInitial();
    }, []);

    const loadInitial = () => {
        const data = getPatients(1);
        setPatients(data);
        setPage(1);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            loadInitial();
            setRefreshing(false);
        }, 800);
    };

    const loadMore = () => {
        if (loadingMore) return;

        setLoadingMore(true);
        setTimeout(() => {
            const nextPage = page + 1;
            const moreData = getPatients(nextPage);
            setPatients(prev => [...prev, ...moreData]);
            setPage(nextPage);
            setLoadingMore(false);
        }, 800);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Patients</Text>

            <FlatList
                data={patients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PatientItem patient={item} onPress={() => { }} />
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={loadMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={
                    loadingMore ? (
                        <ActivityIndicator style={{ marginVertical: 16 }} />
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
    },
    header: {
        fontSize: 26, fontWeight: "700", textAlign: "center", marginBottom: 16
    },
});
