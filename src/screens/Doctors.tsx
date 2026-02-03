import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { doctors } from "../data/doctors";
import { useNavigation } from "@react-navigation/native";

import Animated, { FadeInDown } from "react-native-reanimated";

import { wp, hp, moderateScale } from "../utils/responsive";

const Doctors = () => {
    const navigation = useNavigation<any>();

    const CARD_WIDTH = wp(44);

    return (
        <View style={styles.container}>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                renderItem={({ item, index }) => (
                    <Animated.View
                        entering={FadeInDown.delay(index * 100).duration(600).springify()}
                        style={{ width: CARD_WIDTH }}
                    >
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate("DoctorDetails", { doctor: item })}
                        >
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.specialization}>{item.specialization}</Text>
                                <Text style={styles.experience}>{item.experience}</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            />
        </View>
    );
};

export default Doctors;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8fafc" },
    listContent: { padding: wp(4) },
    heading: { fontSize: moderateScale(26), fontWeight: "700", textAlign: "center", marginBottom: hp(2) },
    row: { justifyContent: "space-between", marginBottom: hp(1.5) },
    card: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: wp(4),
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: { width: "100%", height: hp(18) },
    cardContent: { padding: wp(3), alignItems: "center" },
    name: { fontSize: moderateScale(15), fontWeight: "700", textAlign: "center" },
    specialization: { fontSize: moderateScale(13), color: "#2563eb", marginTop: hp(0.5) },
    experience: { fontSize: moderateScale(12), color: "#6b7280", marginTop: hp(0.2) },
});
