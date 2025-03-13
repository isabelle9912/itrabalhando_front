import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Freelancers from './pages/freelancers/Freelancers.tsx';
import Projects from './pages/projects/Projects.tsx';
import Profile from './pages/profile/Profile.tsx';
import CustomNavbar from "./components/navbar/Navbar.tsx";
import ProjectDetails from "./pages/projectDetails/ProjectDetails.tsx";
import CreateProject from "./pages/createProject/CreateProject.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import Register from "./pages/register/Register.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ProjectProvider } from "./context/ProjectContext.tsx";
import Login from "./pages/login/Login.tsx";

function App() {
    return (
        <Router>
            <UserProvider>
                <ProjectProvider>
                    <ThemeProvider>
                        <CustomNavbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/freelancers" element={<Freelancers />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/project/:id" element={<ProjectDetails />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/create-project" element={<CreateProject />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </ThemeProvider>
                </ProjectProvider>
            </UserProvider>
        </Router>
    );
}

export default App;