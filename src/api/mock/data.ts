import { User } from '../types';

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    doctorId: string;
    doctorName: string;
    message: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
}

// Initial mock users
export const mockUsers: User[] = [
    { id: '1', name: 'Sahil', email: 'admin@gmail.com', role: 'admin' },
    { id: '2', name: 'Dr. Rajiv Pandya', email: 'doctor@gmail.com', role: 'doctor' },
    { id: '3', name: 'John Doe', email: 'patient@gmail.com', role: 'patient' },
];

// Initial mock appointments
export let mockAppointments: Appointment[] = [
    {
        id: '1',
        patientId: '3',
        patientName: 'Shiraj Grover',
        phone: '1234567890',
        email: 'patient@gmail.com',
        date: '2025-10-24',
        time: '10:00 AM',
        doctorId: '101',
        doctorName: 'Dr. Rajiv Pandya',
        message: 'Regular checkup',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        patientId: '3',
        patientName: 'Ram Dubey',
        phone: '1234567890',
        email: 'patient@gmail.com',
        date: '2025-10-28',
        time: '02:30 PM',
        doctorId: '102',
        doctorName: 'Dr. Ankur Chaudhari',
        message: 'Follow up on headache',
        status: 'pending',
        createdAt: new Date().toISOString(),
    }
];

export const updateMockAppointments = (newAppointments: Appointment[]) => {
    mockAppointments = newAppointments;
};
