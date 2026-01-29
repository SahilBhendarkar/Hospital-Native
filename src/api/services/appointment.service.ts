import { Appointment, mockAppointments, updateMockAppointments } from '../mock/data';
import NetInfo from '@react-native-community/netinfo';
import { offlineQueueService } from './offlineQueue.service';

const DELAY = 1000;

export const getAppointments = async (): Promise<Appointment[]> => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    return [...mockAppointments];
};

export const getAppointmentById = async (id: string): Promise<Appointment | undefined> => {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    return mockAppointments.find(a => a.id === id);
};

export const createAppointment = async (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>, isSync = false): Promise<Appointment> => {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected && !isSync) {
        await offlineQueueService.addToQueue({
            action: 'create',
            serviceName: 'appointment',
            data: data
        });
        throw new Error('Offline: Action Queued');
    }

    await new Promise(resolve => setTimeout(resolve, DELAY));

    // Simple deduplication check: patientName, doctorName, date, time
    const isDuplicate = mockAppointments.some(appt =>
        appt.patientName === data.patientName &&
        appt.doctorName === data.doctorName &&
        appt.date === data.date &&
        appt.time === data.time
    );

    if (isDuplicate) {
        console.warn('Duplicate appointment detected, skipping creation.');
        // Return existing appointment or just the first match
        return mockAppointments.find(appt =>
            appt.patientName === data.patientName &&
            appt.doctorName === data.doctorName &&
            appt.date === data.date &&
            appt.time === data.time
        ) as Appointment;
    }

    const newAppointment: Appointment = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString(),
    };

    updateMockAppointments([...mockAppointments, newAppointment]);
    return newAppointment;
};

export const updateAppointment = async (id: string, data: Partial<Appointment>, isSync = false): Promise<Appointment> => {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected && !isSync) {
        await offlineQueueService.addToQueue({
            action: 'update',
            serviceName: 'appointment',
            data: { id, ...data }
        });
        throw new Error('Offline: Action Queued');
    }

    await new Promise(resolve => setTimeout(resolve, DELAY));

    const index = mockAppointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');

    const updatedAppointment = { ...mockAppointments[index], ...data };
    const newAppointments = [...mockAppointments];
    newAppointments[index] = updatedAppointment;

    updateMockAppointments(newAppointments);
    return updatedAppointment;
};

export const deleteAppointment = async (id: string, isSync = false): Promise<void> => {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected && !isSync) {
        await offlineQueueService.addToQueue({
            action: 'delete',
            serviceName: 'appointment',
            data: { id }
        });
        throw new Error('Offline: Action Queued');
    }

    await new Promise(resolve => setTimeout(resolve, DELAY));

    const newAppointments = mockAppointments.filter(a => a.id !== id);
    updateMockAppointments(newAppointments);
};
