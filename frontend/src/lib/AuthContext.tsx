'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, validateCredentials } from './mockData';

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    isRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // Restore session from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser(parsed);
                setIsLoggedIn(true);
            } catch {
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string, password: string): boolean => {
        const validatedUser = validateCredentials(email, password);
        if (validatedUser) {
            setIsLoggedIn(true);
            setUser(validatedUser);
            localStorage.setItem('user', JSON.stringify(validatedUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    const isRole = (role: UserRole | UserRole[]): boolean => {
        if (!user) return false;
        if (Array.isArray(role)) {
            return role.includes(user.role);
        }
        return user.role === role;
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, logout, isRole }}>
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

export type { User, UserRole };
