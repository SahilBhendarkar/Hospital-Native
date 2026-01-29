import { User } from './types';
import { mockUsers } from './mock/data';

interface LoginResponse {
    token: string;
    user: User;
}


export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email.toLowerCase());

    if (user && password === `${user.role}123`) {
        return {
            token: 'mock-jwt-token-' + Date.now(),
            user: user,
        };
    }

    throw new Error('Invalid email or password');
};


export const logoutUser = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
};
