import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Freelancers from './pages/freelancers/Freelancers.tsx';
import Projects from './pages/projects/Projects.tsx';
import Profile from './pages/profile/Profile.tsx';
import CustomNavbar from "./components/navbar/Navbar.tsx";
import ProjectDetails from "./pages/projectDetails/ProjectDetails.tsx";

function App() {
    return (
        <Router>
            <CustomNavbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/freelancers" element={<Freelancers />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;