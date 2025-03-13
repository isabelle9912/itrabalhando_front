import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggleButton } from "../theme/ThemeToggleButton.tsx";
import { useUserContext } from "../../context/UserContext.tsx";

const CustomNavbar = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useUserContext();

    const handleLogout = () => {
        userLogout(); // Chama a função de logout do contexto
        navigate('/login'); // Navega para a página de login
    };

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Freelancer Platform</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/freelancers">Freelancers</Nav.Link>
                        <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                        {user ? ( // Verifica se o usuário está logado
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/register">Registrar</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        )}
                        <Nav.Link><ThemeToggleButton/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;