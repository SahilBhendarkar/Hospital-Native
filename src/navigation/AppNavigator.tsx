import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import MainNavigator from './MainNavigator';
import linking from './linking';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthChoiceScreen from '../screens/AuthChoiceScreen';
import { usePushNotifications } from '../hooks/usePushNotifications';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { token, isLoading } = useAuth();
    usePushNotifications(); // Initialize notification listeners globally

    return (
        <SafeAreaProvider>
            <NavigationContainer linking={linking}>
                <Stack.Navigator id="auth-stack" screenOptions={{ headerShown: false }}>
                    {isLoading ? (
                        <Stack.Screen name="Loading" component={LoadingScreen} />
                    ) : token ? (
                        <Stack.Screen name="Home" component={MainNavigator} />
                    ) : (
                        <>
                            <Stack.Screen name="Loading" component={LoadingScreen} />
                            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                            <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
                            <Stack.Screen name="Login" component={LoginScreen} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default AppNavigator;
