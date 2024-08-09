import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    const signIn = async ({ email, password }) => {
        setUser({ id: 1, name: 'usuário 1', email });
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