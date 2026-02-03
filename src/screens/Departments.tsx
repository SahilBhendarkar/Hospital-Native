import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { departments } from "../data/departments";
import { useNavigation } from "@react-navigation/native";

import Animated, { FadeInDown } from "react-native-reanimated";

import { wp, hp, moderateScale } from "../utils/responsive";

const Departments = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <FlatList
                data={departments}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                renderItem={({ item, index }) => (
                    <Animated.View
                        entering={FadeInDown.delay(index * 100).duration(600).springify()}
                        style={{ width: wp(44) }}
                    >
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                                navigation.navigate("DepartmentDetails", {
                                    department: item,
                                })
                            }
                        >
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.cardContent}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text numberOfLines={3} style={styles.description}>
                                    {item.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            />
        </View>
    );
};

export default Departments;

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
    image: { width: "100%", height: hp(14) },
    cardContent: { padding: wp(3) },
    title: { fontSize: moderateScale(16), fontWeight: "700", marginBottom: hp(0.5) },
    description: { fontSize: moderateScale(13), color: "#6b7280" },
});
