import { useParams } from 'react-router-dom';
import { useProjectContext } from '../../context/ProjectContext';
import { Card, Container, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useUserContext} from "../../context/UserContext.tsx";
import {isClient} from "../../utils/typeGuards.ts";

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { projects } = useProjectContext();
    const { users } = useUserContext();

    // Encontra o projeto pelo ID
    const project = projects.find((project) => project.id === id);

    if (!project) {
        return <Container className="mt-4">Projeto não encontrado.</Container>;
    }

    // Encontra o cliente que publicou o projeto
    const client = users.find((user) => user.id === project.clientId);

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Orçamento:</strong> R$ {project.budget.toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Prazo:</strong> {new Date(project.deadline).toLocaleDateString()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Habilidades Requeridas:</strong>{' '}
                            {project.skillsRequired.join(', ')}
                        </ListGroup.Item>
                        {client && isClient(client.data) && (
                            <ListGroup.Item>
                                <strong>Publicado por:</strong> {client.data.name} <br />
                                <strong>E-mail:</strong> {client.data.email} <br />
                                {client.data.company && (
                                    <>
                                        <strong>Empresa:</strong> {client.data.company}
                                    </>
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    <Button as={Link} to="/projects" variant="primary" className="mt-3">
                        Voltar para Projetos
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProjectDetails;