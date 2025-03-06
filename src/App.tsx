import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Freelancers from './pages/Freelancers';
import Projects from './pages/Projects';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/freelancers" element={<Freelancers />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;