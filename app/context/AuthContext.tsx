// AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
    user: AuthUser | null;
    login: (user: AuthUser) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const isWeb = Platform.OS === "web";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = "accessToken";
const ROLE_KEY = "role";

export interface AuthUser {
    accessToken: string;
    role: string;
}

// --- Storage Helpers ---
export const saveItem = async (key: string, value: string) => {
    if (isWeb) {
        localStorage.setItem(key, value);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
};

export const getItem = async (key: string): Promise<string | null> => {
    if (isWeb) {
        return localStorage.getItem(key);
    } else {
        return await SecureStore.getItemAsync(key);
    }
};

export const removeItem = async (key: string) => {
    if (isWeb) {
        localStorage.removeItem(key);
    } else {
        await SecureStore.deleteItemAsync(key);
    }
};

// --- Auth Provider ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const savedToken = await getItem(ACCESS_TOKEN_KEY);
            const savedRole = await getItem(ROLE_KEY);

            if (savedToken && savedRole) {
                setUser({ accessToken: savedToken, role: savedRole });
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (user: AuthUser) => {
        setUser(user);
        await saveItem(ACCESS_TOKEN_KEY, user.accessToken);
        await saveItem(ROLE_KEY, user.role);
    };

    const logout = async () => {
        setUser(null);
        await removeItem(ACCESS_TOKEN_KEY);
        await removeItem(ROLE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// --- Custom Hook ---
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
