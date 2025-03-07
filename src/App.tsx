import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Freelancers from './pages/freelancers/Freelancers.tsx';
import Projects from './pages/projects/Projects.tsx';
import Profile from './pages/profile/Profile.tsx';
import CustomNavbar from "./components/navbar/Navbar.tsx";
import ProjectDetails from "./pages/projectDetails/ProjectDetails.tsx";
import CreateProject from "./pages/createProject/CreateProject.tsx";
import {ThemeProvider, useTheme} from "./context/ThemeContext.tsx";
import {LuMoon, LuSun} from "react-icons/lu";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button className="btn" onClick={toggleTheme}>
            {theme === "dark" ? <LuSun /> : <LuMoon />}
        </button>
    );
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <CustomNavbar/>
                <div className="container mt-3">
                    <ThemeToggleButton />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/freelancers" element={<Freelancers />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/project/:id" element={<ProjectDetails />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/create-project" element={<CreateProject />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;