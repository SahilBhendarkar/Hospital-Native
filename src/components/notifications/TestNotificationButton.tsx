import React, { useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import * as Notifications from "expo-notifications";

/* ---------- REQUIRED handler ---------- */
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

const TestNotificationButton = () => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 });

        Notifications.requestPermissionsAsync();
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const sendTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hospital-Mobile",
                body: "This is a Demo notification",
            },
            trigger: null, 
        });
    };

    return (
        <Animated.View style={[styles.wrapper, animatedStyle]}>
            <TouchableOpacity
                style={styles.button}
                onPress={sendTestNotification}
                activeOpacity={0.85}
            >
                <Text style={styles.text}>Test Notification</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default TestNotificationButton;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 16,
    },
    button: {
        backgroundColor: "#10b981",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
