import { User } from './types';

interface LoginResponse {
    token: string;
    user: User;
}


export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === 'admin@gmail.com' && password === 'admin123') {
        return {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: '1',
                name: 'Sahil',
                email: email,
                role: 'admin',
            },
        };
    } else if (email === 'doctor@gmail.com' && password === 'doctor123') {
        return {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: '2',
                name: 'Dr. Smith',
                email: email,
                role: 'doctor',
            },
        };
    } else if (email === 'patient@gmail.com' && password === 'patient123') {
        return {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: '3',
                name: 'John Doe',
                email: email,
                role: 'patient',
            },
        };
    }

    throw new Error('Invalid email or password');
};


export const logoutUser = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
};
