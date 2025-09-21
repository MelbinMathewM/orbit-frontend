// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme as rnUseColorScheme } from "react-native";
import { colorScheme } from "nativewind";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemScheme = rnUseColorScheme();
    const [theme, setTheme] = useState<Theme>(
        (systemScheme === "dark" ? "dark" : "light")
    );

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        colorScheme.set(newTheme);
    };

    useEffect(() => {
        if (systemScheme) {
            setTheme(systemScheme);
            colorScheme.set(systemScheme);
        }
    }, [systemScheme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("ThemeContext must wrap application");
    return ctx;
};
