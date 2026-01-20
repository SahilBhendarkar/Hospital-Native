import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './MainNavigator';

const AppNavigator = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default AppNavigator;
