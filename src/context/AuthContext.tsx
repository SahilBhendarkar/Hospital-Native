import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { storage } from '../utils/storage';
import { User } from '../api/types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const storedUser = await storage.load('user');
            const storedToken = await storage.load('token');

            if (storedUser && storedToken) {
                setUser(storedUser);
                setToken(storedToken);
            }
        } catch (error) {
            console.error('Failed to load auth data', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (newToken: string, newUser: User) => {
        setIsLoading(true);
        setUser(newUser);
        setToken(newToken);
        await storage.save('token', newToken);
        await storage.save('user', newUser);
        setIsLoading(false);
    };


    const logout = async () => {
        setIsLoading(true);
        setUser(null);
        setToken(null);
        await storage.remove('token');
        await storage.remove('user');
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
