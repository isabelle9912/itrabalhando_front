import { useProjectContext } from '../../context/ProjectContext';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Projects = () => {
    const { projects } = useProjectContext();

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Projetos Publicados</h1>
            <Row>
                {projects.map((project) => (
                    <Col key={project.id} md={6} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                                <Card.Text>
                                    <strong>Orçamento:</strong> R$ {project.budget.toFixed(2)}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Prazo:</strong> {new Date(project.deadline).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Habilidades Requeridas:</strong>{' '}
                                    {project.skillsRequired.join(', ')}
                                </Card.Text>
                                <Button as={Link} to={`/project/${project.id}`} variant="primary">
                                    Ver Detalhes
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Projects;