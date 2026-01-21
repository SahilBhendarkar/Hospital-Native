import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import Services from '../screens/Services';
import AppointmentAndEvents from '../screens/AppointmentAndEvents';
import About from '../screens/About';
import Departments from '../screens/Departments';
import Doctors from '../screens/Doctors';
import PatientList from '../screens/PatientList';


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
                    } else if (route.name === 'Departments') {
                        iconName = 'layers';
                    } else if (route.name === 'Doctors') {
                        iconName = 'users';
                    } else if (route.name === 'Appointment') {
                        iconName = 'calendar';
                    } else if (route.name === 'About') {
                        iconName = 'info';
                    } else {
                        iconName = 'help-circle';
                    }

                    return <Feather name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: 'gray',
                headerShown: false, // We use our custom Header component in each screen
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Departments" component={Departments} />
            <Tab.Screen name="Patients" component={PatientList} />
            <Tab.Screen name="Appointment" component={AppointmentAndEvents} />
            <Tab.Screen name="About" component={About} />

        </Tab.Navigator>
    );
};

export default TabNavigator;
