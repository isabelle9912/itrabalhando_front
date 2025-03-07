import { useProjectContext } from '../../context/ProjectContext';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useState} from "react";

const Projects = () => {
    const { projects } = useProjectContext();
    const [searchTerm, setSearchTerm] = useState('');

    // Filtra projetos com base no termo de busca
    const filteredProjects = projects.filter((project) => {
        const { title, description, skillsRequired } = project;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            title.toLowerCase().includes(lowerCaseSearchTerm) ||
            description.toLowerCase().includes(lowerCaseSearchTerm) ||
            skillsRequired.join(', ').toLowerCase().includes(lowerCaseSearchTerm)
        );
    });


    return (
        <Container className="mt-4">
            <h1 className="mb-4">Projetos Publicados</h1>

            {/* Botão para criar novo projeto */}
            <Button href="/create-project" variant="success" className="mb-4">
                Publicar Novo Projeto
            </Button>

            {/* Barra de Busca */}
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Buscar projetos por título, descrição ou habilidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>

            {/* Lista de Projetos */}
            <Row>
                {filteredProjects.length === 0 ? (
                    <p>Nenhum projeto encontrado com o termo "{searchTerm}".</p>
                ) : (
                    filteredProjects.map((project) => (
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
                                    <Button href={`/project/${project.id}`} variant="primary">
                                        Ver Detalhes
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default Projects;