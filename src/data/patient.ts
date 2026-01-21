export type Patient = {
    id: string;
    name: string;
    age: number;
    condition: string;
};

export const patients: Patient[] = [
    { id: "p1", name: "Rahul Sharma", age: 34, condition: "General Checkup" },
    { id: "p2", name: "Anita Verma", age: 28, condition: "Dental Consultation" },
    { id: "p3", name: "Amit Patil", age: 45, condition: "Hypertension" },
    { id: "p4", name: "Neha Kulkarni", age: 31, condition: "Pregnancy Care" },
    { id: "p5", name: "Suresh Rao", age: 52, condition: "Diabetes Follow-up" },
    { id: "p6", name: "Pooja Mehta", age: 26, condition: "Skin Allergy" },
    { id: "p7", name: "Vikram Singh", age: 39, condition: "Orthopedic Pain" },
    { id: "p8", name: "Kavita Joshi", age: 47, condition: "Thyroid Check" },
    { id: "p9", name: "Rohan Deshmukh", age: 22, condition: "Fever & Cold" },
    { id: "p10", name: "Sunita Nair", age: 60, condition: "Cardiac Review" },
];


export const getPatients = (page: number, limit = 5): Patient[] => {
    return Array.from({ length: limit }, (_, i) => ({
        id: `p-${page}-${i}`,
        name: `Patient ${page * limit + i + 1}`,
        age: 20 + (i % 40),
        condition: "General Consultation",
    }));
};
