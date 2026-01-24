import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NavigationHeader from '../components/layout/NavigationHeader';
import DepartmentDetails from '../screens/DepartmentDetails';
import AppointmentAndEvents from '../screens/AppointmentAndEvents';
import Departments from '../screens/Departments';
import Doctors from '../screens/Doctors';
import DoctorDetails from '../screens/DoctorDetails';
import PatientList from '../screens/PatientList';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            id="main-stack-navigator"
            screenOptions={{
                header: () => <NavigationHeader />,
                animation: 'slide_from_right',
                gestureEnabled: true,
                animationDuration: 300,
            }}
        >
            <Stack.Screen name="Hospital UI" component={TabNavigator} />
            <Stack.Screen name="Departments" component={Departments} />
            <Stack.Screen name="DepartmentDetails" component={DepartmentDetails} />
            <Stack.Screen name="Doctors" component={Doctors} />
            <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
            <Stack.Screen name="Patients" component={PatientList} />
            <Stack.Screen name="Appointment" component={AppointmentAndEvents} />

        </Stack.Navigator>
    );
};

export default MainNavigator;
