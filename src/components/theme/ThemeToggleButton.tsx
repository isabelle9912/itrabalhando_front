import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext.tsx";

export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button className="btn" onClick={toggleTheme}>
            {theme === "dark" ? <LuSun /> : <LuMoon />}
        </button>
    );
};