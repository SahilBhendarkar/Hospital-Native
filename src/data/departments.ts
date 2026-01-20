import { ImageSourcePropType } from "react-native";

export interface Department {
    id: number;
    title: string;
    description: string;
    image: ImageSourcePropType;
    screen: string;
}

export const departments: Department[] = [
    {
        id: 1,
        title: "Cardiology",
        description:
            "A condition where the blood vessels supplying the heart become blocked.",
        image: require("../../assets/departments/cardiology.jpg"),
        screen: "Cardiology",
    },
    {
        id: 2,
        title: "Critical Care Medicine (ICU)",
        description:
            "Managing patients with severe and complex conditions.",
        image: require("../../assets/departments/ICU.jpg"),
        screen: "ICU",
    },
    {
        id: 3,
        title: "Advanced Dialysis Unit",
        description: "Dedicated dialysis services with modern equipment.",
        image: require("../../assets/departments/dialysis.jpg"),
        screen: "Dialysis",
    },
    {
        id: 4,
        title: "Endoscopy",
        description: "Diagnostic and therapeutic endoscopic procedures.",
        image: require("../../assets/departments/endoscopy.jpg"),
        screen: "Endoscopy",
    },
    {
        id: 5,
        title: "ENT Surgery",
        description: "Comprehensive ENT surgical care.",
        image: require("../../assets/departments/ent.jpg"),
        screen: "ENT",
    },
    {
        id: 6,
        title: "Gastroenterology",
        description: "Comprehensive digestive system care.",
        image: require("../../assets/departments/gastroenterology.jpg"),
        screen: "Gastroenterology",
    },
    {
        id: 7,
        title: "Joint Replacement",
        description: "Primary and revision hip & knee replacement surgeries.",
        image: require("../../assets/departments/joint.jpg"),
        screen: "JointReplacement",
    },
    {
        id: 8,
        title: "Laparoscopic Surgery",
        description: "Minimally invasive surgical procedures.",
        image: require("../../assets/departments/laparoscopic.jpg"),
        screen: "Laparoscopic",
    },
    {
        id: 9,
        title: "Nephrology",
        description: "Comprehensive kidney care.",
        image: require("../../assets/departments/nephrology.jpg"),
        screen: "Nephrology",
    },
    {
        id: 10,
        title: "Neurology & Neurosurgery",
        description: "Brain, spine, and nervous system treatment.",
        image: require("../../assets/departments/neurology.jpg"),
        screen: "Neurology",
    },
    {
        id: 11,
        title: "Oncosurgery",
        description: "Advanced surgical cancer treatment.",
        image: require("../../assets/departments/oncosurgery.jpg"),
        screen: "Oncosurgery",
    },
    {
        id: 12,
        title: "Ophthalmology",
        description: "Complete eye care and vision correction.",
        image: require("../../assets/departments/ophthalmology.jpg"),
        screen: "Ophthalmology",
    },
    {
        id: 13,
        title: "Orthopedics & Trauma",
        description: "Fracture, trauma, and orthopedic surgeries.",
        image: require("../../assets/departments/orthopedics.jpg"),
        screen: "Orthopedics",
    },
    {
        id: 14,
        title: "Palliative Pain Management",
        description: "Pain relief and supportive care services.",
        image: require("../../assets/departments/care.png"),
        screen: "PalliativeCare",
    },
    {
        id: 15,
        title: "Pathology",
        description: "Advanced diagnostic laboratory services.",
        image: require("../../assets/departments/pathology.jpg"),
        screen: "Pathology",
    },
    {
        id: 16,
        title: "Radiology & Imaging",
        description: "MRI, CT, X-ray, and ultrasound services.",
        image: require("../../assets/departments/radiology.jpg"),
        screen: "Radiology",
    },
];
