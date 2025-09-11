import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
                {children}
            </View>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
    return ctx;
};
