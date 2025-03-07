import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        return localStorage.getItem("theme") === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.body.setAttribute("data-bs-theme", theme); // Usa Bootstrap para o tema
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
};