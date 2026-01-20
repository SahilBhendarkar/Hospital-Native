import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const NavigationHeader = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();

    const openLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };

    const canGoBack = navigation.canGoBack();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.left}>
                    {canGoBack ? (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" size={22} color="#111827" />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>H</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.title}>{route.name}</Text>

                <TouchableOpacity onPress={() => openLink('tel:+919099433366')}>
                    <View style={styles.callButton}>
                        <Feather name="phone" size={16} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NavigationHeader;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        ...Platform.select({
            android: { elevation: 4 },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
        }),
    },
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    left: {
        width: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontWeight: 'bold',
    },
    callButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#10b981',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
