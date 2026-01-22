export interface Patient {
    id: string;
    name: string;
    age: number;
    condition: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
}
