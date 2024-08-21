import React, { createContext, useEffect, useState } from "react";
import { useUserDatabase } from "../../database/useUserDatabase";

const AuthContext = createContext({});

export const Role = {
    SUPER: 'SUPER',
    ADM: 'ADM',
    USER: 'USER',
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        autenticated: null,
        user: null,
        role: null,
    });

    const { authUser } = useUserDatabase();

    const signIn = async ({ email, password }) => {
        const response = await authUser({ email, password });

        if (!response) {
            setUser({ autenticated: false, user: null, role: null });
        }

        setUser({ autenticated: true, user: response, role: response.role });
    };

    const signOut = async () => {
        setUser({});
    };

    useEffect(() => {
        console.log('AuthProvider: ', user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}