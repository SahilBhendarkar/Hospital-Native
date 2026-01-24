export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    qualification: string;
    experience: string;
    image: any;
    profileUrl: string;
    departments: string[];
    bio: string;
}

export const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Anil Sharma",
        specialization: "Orthopaedic Surgeon",
        qualification: "MBBS, MS (Orthopaedics)",
        experience: "15+ Years",
        image: require("../../assets/team/Ankur.png"),
        profileUrl: "/doctors/anil-sharma",
        departments: ["Orthopedics & Trauma", "Joint Replacement"],
        bio: "Dr. Anil Sharma is a renowned Orthopaedic Surgeon with over 15 years of experience in complex joint replacements and trauma surgeries.",
    },
    {
        id: 2,
        name: "Dr. Priya Mehta",
        specialization: "Cardiologist",
        qualification: "MBBS, DM (Cardiology)",
        experience: "12+ Years",
        image: require("../../assets/team/Hiren.png"),
        profileUrl: "/doctors/priya-mehta",
        departments: ["Cardiology"],
        bio: "Dr. Priya Mehta specializes in interventional cardiology and has a keen interest in preventive heart care.",
    },
    {
        id: 3,
        name: "Dr. Rajiv Pandya",
        specialization: "General Physician",
        qualification: "MBBS, MD (Medicine)",
        experience: "18+ Years",
        image: require("../../assets/team/Nainesh.png"),
        profileUrl: "/doctors/rajiv-pandya",
        departments: ["General Medicine"],
        bio: "Dr. Rajiv Pandya is a dedicated General Physician focusing on holistic patient care and chronic disease management.",
    },
    {
        id: 4,
        name: "Dr. Nainesh Patel",
        specialization: "Orthopaedic & Joint Replacement",
        qualification: "MBBS, MS, FMAS, FIAGES",
        experience: "13+ Years",
        image: require("../../assets/team/Rajiv.png"),
        profileUrl: "/doctors/nainesh-patel",
        departments: ["Joint Replacement", "Orthopedics & Trauma"],
        bio: "Dr. Nainesh Patel is an expert in minimally invasive joint replacement surgeries and sports injuries.",
    },
    {
        id: 5,
        name: "Dr. Ankur K. Chaudhari",
        specialization: "Interventional Cardiologist",
        qualification: "MBBS, MD (Medicine), Fellowship in 2D Echo",
        experience: "10+ Years",
        image: require("../../assets/team/Ankur.png"),
        profileUrl: "/doctors/ankur-chaudhari",
        departments: ["Cardiology"],
        bio: "Dr. Ankur K. Chaudhari is a leading Interventional Cardiologist with extensive experience in 2D Echo and complex cardiac procedures.",
    },
    {
        id: 6,
        name: "Dr. Sneha Kulkarni",
        specialization: "Gynecologist & Obstetrician",
        qualification: "MBBS, MS (Obstetrics & Gynecology)",
        experience: "11+ Years",
        image: require("../../assets/team/Hiren.png"),
        profileUrl: "/doctors/sneha-kulkarni",
        departments: ["Gynecology & Obstetrics"],
        bio: "Dr. Sneha Kulkarni provides comprehensive care in women's health, specializing in high-risk pregnancies and laparoscopic surgeries.",
    },
    {
        id: 7,
        name: "Dr. Rohan Deshpande",
        specialization: "Neurologist",
        qualification: "MBBS, DM (Neurology)",
        experience: "9+ Years",
        image: require("../../assets/team/Nainesh.png"),
        profileUrl: "/doctors/rohan-deshpande",
        departments: ["Neurology & Neurosurgery"],
        bio: "Dr. Rohan Deshpande treats a wide range of neurological disorders with a patient-centric approach.",
    },
    {
        id: 8,
        name: "Dr. Kavita Joshi",
        specialization: "Dermatologist",
        qualification: "MBBS, MD (Dermatology)",
        experience: "8+ Years",
        image: require("../../assets/team/Rajiv.png"),
        profileUrl: "/doctors/kavita-joshi",
        departments: ["Dermatology"],
        bio: "Dr. Kavita Joshi is an experienced Dermatologist offering treatments for various skin, hair, and nail conditions.",
    },
];
