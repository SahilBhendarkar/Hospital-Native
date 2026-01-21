import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NavigationHeader from '../components/layout/NavigationHeader';
import DepartmentDetails from '../screens/DepartmentDetails';
import Departments from '../screens/Departments';
import Doctors from '../screens/Doctors';
import PatientList from '../screens/PatientList';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            id="main-stack-navigator"
            screenOptions={{
                header: () => <NavigationHeader />,
            }}
        >
            <Stack.Screen name="Hospital UI" component={TabNavigator} />
            <Stack.Screen name="Departments" component={Departments} />
            <Stack.Screen name="DepartmentDetails" component={DepartmentDetails} />
            <Stack.Screen name="Doctors" component={Doctors} />
            <Stack.Screen name="Patients" component={PatientList} />

        </Stack.Navigator>
    );
};

export default MainNavigator;
