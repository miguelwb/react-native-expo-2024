import React, { createContext, useEffect, useState } from "react";
import { useUserDatabase } from "../../database/useUserDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";

const AuthContext = createContext({});

export const Role = {
    SUPER: 'SUPER',
    ADM: 'ADM',
    USER: 'USER',
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        autenticated: false,
        user: null,
        role: null,
    });

    const { authUser } = useUserDatabase();

    useEffect(() => {
        const loadStorageData = async () => {
            const storageUser = await AsyncStorage.getItem('@payment:user');

            if (storageUser) {
                setUser({
                    autehnticated: true,
                    user: JSON.parse(storageUser),
                    role: JSON.parse(storageUser).role,
                })
            } else {
                setUser({
                    autenticated: false,
                    user: null,
                    role: null
                });
            };
        };

        loadStorageData();
    }, []);

    useEffect(() => {
        console.log('AuthProvider: ', user);
    }, [user]);

    const signIn = async ({ email, password }) => {
        const response = await authUser({ email, password });
        if (!response) {
            setUser({ autenticated: false, user: null, role: null });
            return;
        }

        await AsyncStorage.setItem("@payment:user", JSON.stringify(user));

        setUser({ autenticated: true, user: response, role: response.role });
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("@payment:user");
        setUser({
            autenticated: false,
            user: null,
            role: null
        });
    };

    useEffect(() => {
        console.log('AuthProvider: ', user);
    }, [user]);

    if (user?.autenticated === null) {
        return( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Carregando Dados do Usuário</Text>
            <ActivityIndicator />
        </View>
        );
      }

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