import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

const linking: LinkingOptions<any> = {
    prefixes: ["hospital-mobile://", Linking.createURL("/")],
    config: {
        initialRouteName: "Home",
        screens: {
            Login: "login",

            Home: {
                screens: {
                    Home: "home",
                    Patients: "patients",
                    Camera: "camera",
                    About: "about",
                },
            },

            Departments: "departments",
            DepartmentDetails: "department/:id",
            Doctors: "doctors",
            Appointment: "appointment",
            UploadDemo: "upload-demo",
        },
    },
};

export default linking;
