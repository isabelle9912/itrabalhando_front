import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../components/projectForm/ProjectForm.tsx';
import { Container } from 'react-bootstrap';

const CreateProject = () => {
    const navigate = useNavigate();

    const handleSubmitSuccess = () => {
        navigate('/projects'); // Redireciona para a página de projetos após a publicação
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Publicar Novo Projeto</h1>
            <ProjectForm onSubmitSuccess={handleSubmitSuccess} />
        </Container>
    );
};

export default CreateProject;