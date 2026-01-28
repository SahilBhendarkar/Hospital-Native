import { Text, StyleSheet, Pressable } from "react-native";
import type { Patient } from "../../api/types";

interface Props {
    patient: Patient;
    onPress: () => void;
    onLongPress: () => void;
}

const PatientItem = ({ patient, onPress, onLongPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={500}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed
            ]}
        >
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
    pressed: {
        backgroundColor: "#f0f0f0",
        transform: [{ scale: 0.98 }],
    },
});

export default PatientItem;
