export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    qualification: string;
    experience: string;
    image: any;
    profileUrl: string;
    departments: string[];
}

export const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Anil Sharma",
        specialization: "Orthopaedic Surgeon",
        qualification: "MBBS, MS (Orthopaedics)",
        experience: "15+ Years",
        image: "/assets/team/Ankur.png",
        profileUrl: "/doctors/anil-sharma",
        departments: ["Orthopedics & Trauma", "Joint Replacement"],
    },
    {
        id: 2,
        name: "Dr. Priya Mehta",
        specialization: "Cardiologist",
        qualification: "MBBS, DM (Cardiology)",
        experience: "12+ Years",
        image: "/assets/team/Hiren.png",
        profileUrl: "/doctors/priya-mehta",
        departments: ["Cardiology"],
    },
    {
        id: 3,
        name: "Dr. Rajiv Pandya",
        specialization: "General Physician",
        qualification: "MBBS, MD (Medicine)",
        experience: "18+ Years",
        image: "/assets/team/Nainesh.png",
        profileUrl: "/doctors/rajiv-pandya",
        departments: ["General Medicine"],
    },
    {
        id: 4,
        name: "Dr. Nainesh Patel",
        specialization: "Orthopaedic & Joint Replacement",
        qualification: "MBBS, MS, FMAS, FIAGES",
        experience: "13+ Years",
        image: "/assets/team/Rajiv.png",
        profileUrl: "/doctors/nainesh-patel",
        departments: ["Joint Replacement", "Orthopedics & Trauma"],
    },
    {
        id: 5,
        name: "Dr. Ankur K. Chaudhari",
        specialization: "Interventional Cardiologist",
        qualification: "MBBS, MD (Medicine), Fellowship in 2D Echo",
        experience: "10+ Years",
        image: "/assets/team/Ankur.png",
        profileUrl: "/doctors/ankur-chaudhari",
        departments: ["Cardiology"],
    },
    {
        id: 6,
        name: "Dr. Sneha Kulkarni",
        specialization: "Gynecologist & Obstetrician",
        qualification: "MBBS, MS (Obstetrics & Gynecology)",
        experience: "11+ Years",
        image: "/assets/team/Hiren.png",
        profileUrl: "/doctors/sneha-kulkarni",
        departments: ["Gynecology & Obstetrics"],
    },
    {
        id: 7,
        name: "Dr. Rohan Deshpande",
        specialization: "Neurologist",
        qualification: "MBBS, DM (Neurology)",
        experience: "9+ Years",
        image: "/assets/team/Nainesh.png",
        profileUrl: "/doctors/rohan-deshpande",
        departments: ["Neurology & Neurosurgery"],
    },
    {
        id: 8,
        name: "Dr. Kavita Joshi",
        specialization: "Dermatologist",
        qualification: "MBBS, MD (Dermatology)",
        experience: "8+ Years",
        image: "/assets/team/Rajiv.png",
        profileUrl: "/doctors/kavita-joshi",
        departments: ["Dermatology"],
    },
];
