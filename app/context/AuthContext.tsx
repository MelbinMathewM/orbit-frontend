// AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface AuthContextType {
    user: AuthUser | null;
    login: (user: LoginInput) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const isWeb = Platform.OS === "web";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = "accessToken";
const ROLE_KEY = "role";

interface TokenPayload {
    name: string;
    email: string;
    role: string;
    exp: number;
};
export interface AuthUser {
    accessToken: string;
    name: string,
    email: string;
    role: string;
};

interface LoginInput {
    accessToken: string;
    role: string;
};

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
                const payload = parseToken(savedToken);
                if (payload) {
                    setUser({
                        accessToken: savedToken,
                        name: payload.name,
                        email: payload.email,
                        role: savedRole,
                    });
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async ({ accessToken, role }: LoginInput) => {
        const payload = parseToken(accessToken);
        if (payload) {
            setUser({
                accessToken,
                name: payload.name,
                email: payload.email,
                role: role,
            });
        }
        await saveItem(ACCESS_TOKEN_KEY, accessToken);
        await saveItem(ROLE_KEY, role);
    };

    const logout = async () => {
        setUser(null);
        await removeItem(ACCESS_TOKEN_KEY);
        await removeItem(ROLE_KEY);
        router.push("/");
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

export const parseToken = (token: string): TokenPayload | null => {
    try {
        return jwtDecode<TokenPayload>(token);
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
};

