import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Image } from "react-native"; 

const NavigationHeader = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                    },
                },
            ]
        );
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
                            <Image
                                source={require('../../../assets/images/hospital.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                        </View>
                    )}
                </View>

                <Text style={styles.title}>{route.name}</Text>

                <View style={styles.rightActions}>
                    {user && (
                        <TouchableOpacity onPress={handleLogout} style={styles.actionButton}>
                            <Feather name="log-out" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    )}
                </View>
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
        overflow: 'hidden',
    },
    logoImage: {
        width: 24,
        height: 24,
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    actionButton: {
    },
});
