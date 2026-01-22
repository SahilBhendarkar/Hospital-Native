import { Text, StyleSheet, Pressable } from "react-native";
import type { Patient } from "../../api/types";

interface Props {
    patient: Patient;
    onPress: () => void;
}

const PatientItem = ({ patient, onPress }: Props) => {
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <Text style={styles.name}>{patient.name}</Text>
            <Text style={styles.meta}>
                {patient.age} yrs • {patient.condition}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    meta: {
        marginTop: 4,
        color: "#555",
    },
});

export default PatientItem;
