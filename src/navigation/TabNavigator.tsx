import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import About from '../screens/About';
import PatientList from '../screens/PatientList';
import { View, StyleSheet, Platform } from 'react-native';
import CameraScreen from "../screens/UploadTestScreen"

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            id="main-tab-navigator"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Feather.glyphMap;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Patients') {
                        iconName = 'users'; 
                    } else if (route.name === 'About') {
                        iconName = 'info';
                    } else {
                        iconName = 'help-circle';
                    }

                    return (
                        <View style={[
                            styles.iconContainer,
                            focused && styles.activeIconContainer
                        ]}>
                            <Feather name={iconName} size={24} color={color} />
                        </View>
                    );
                },
                tabBarActiveTintColor: '#667eea',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: Platform.OS === 'ios' ? 0 : 4,
                },
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 88 : 64,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Patients" component={PatientList} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    activeIconContainer: {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
});

export default TabNavigator;
