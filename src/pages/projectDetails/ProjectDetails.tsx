import { useParams } from 'react-router-dom';
import { useProjectContext } from '../../context/ProjectContext';
import {Card, Container, Button, ListGroup, Tabs, Tab} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useUserContext} from "../../context/UserContext.tsx";
import {isClient} from "../../utils/typeGuards.ts";
import ProposalForm from "../../components/proposalForm/ProposalForm.tsx";


const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { projects, proposals } = useProjectContext();
    const { users } = useUserContext();

    // Encontra o projeto pelo ID
    const project = projects.find((project) => project.id === id);

    if (!project) {
        return <Container className="mt-4">Projeto não encontrado.</Container>;
    }

    // Encontra o cliente que publicou o projeto
    const client = users.find((user) => user.id === project.clientId);

    // Filtra as propostas relacionadas ao projeto
    const projectProposals = proposals.filter((proposal) => proposal.projectId === id);

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


                    <Tabs defaultActiveKey="details" className="mt-4">
                        <Tab eventKey="details" title="Detalhes">
                            {/* Conteúdo dos detalhes do projeto */}
                        </Tab>
                        <Tab eventKey="proposals" title="Propostas">
                            <h4 className="mt-3">Propostas Recebidas</h4>
                            {projectProposals.length > 0 ? (
                                projectProposals.map((proposal) => (
                                    <Card key={proposal.id} className="mb-3">
                                        <Card.Body>
                                            <Card.Text>

                                                <Button as={Link} to={`/profile/${proposal.freelancerId}`} variant="outline-dark">
                                                    Ver Perfil do Freelancer
                                                </Button>
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Mensagem:</strong> {proposal.message}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Orçamento:</strong> R$ {proposal.budget.toFixed(2)}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Prazo:</strong> {new Date(proposal.deadline).toLocaleDateString()}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>Nenhuma proposta recebida ainda.</p>
                            )}
                        </Tab>
                        <Tab eventKey="send-proposal" title="Enviar Proposta">
                            <h4 className="mt-3">Enviar Proposta</h4>
                            {id &&
                              <ProposalForm projectId={id} freelancerId="f-1" />
                            }
                        </Tab>
                    </Tabs>

                    <Button as={Link} to="/projects" variant="primary" className="mt-3">
                        Voltar para Projetos
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProjectDetails;