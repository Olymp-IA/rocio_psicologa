'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string) => {
        setIsLoggedIn(true);
        setUser({ name: 'Paciente', email }); // Mock user
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
