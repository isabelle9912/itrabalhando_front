import { useParams } from 'react-router-dom';
import { useProjectContext } from '../../context/ProjectContext';
import {Card, Container, Button, ListGroup, Tabs, Tab, Col, Row} from 'react-bootstrap';
import {useUserContext} from "../../context/UserContext.tsx";
import {isClient} from "../../utils/typeGuards.ts";
import ProposalForm from "../../components/proposalForm/ProposalForm.tsx";
import {useEffect, useState} from "react";
import {iProject} from "../../interfaces/project.interface.ts";
import {iClient} from "../../interfaces/client.interface.ts";
import {iProposal} from "../../interfaces/proposal.interface.ts";

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { retrieveProject, retrieveProposals } = useProjectContext();
    const { retriveClient } = useUserContext();
    const [project, setProject] = useState<iProject | null>(null);
    const [client, setClient] = useState<iClient | null>(null);
    const [proposals, setProposals] = useState<iProposal[] | []>([]);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!id) return;

            try {
                // Busca o projeto
                const projectData = await retrieveProject(Number(id));
                setProject(projectData);

                // Se houver um cliente associado, busca os dados do cliente
                if (projectData?.client_id) {
                    const clientData = await retriveClient(projectData.client_id);
                    setClient(clientData);
                }

                // Busca as propostas associadas ao projeto
                if (projectData?.id) {
                    const proposalsData = await retrieveProposals(projectData.id);
                    setProposals(proposalsData);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do projeto:", error);
            }
        };

        fetchProjectData();
    }, [id, retrieveProject, retriveClient, retrieveProposals]);

    if (!project) {
        return <Container className="mt-4">Projeto não encontrado.</Container>;
    }

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
                        {client && isClient(client) && (
                            <Row className="align-items-center mb-2">
                                {client.image && (
                                    <Col xs="auto">
                                        <img
                                            src={client.image}
                                            alt={client.name}
                                            className="rounded-circle"
                                            width="60"
                                            height="60"
                                        />
                                    </Col>
                                )}
                                <Col>
                                    <Card.Title>{client.name}</Card.Title>
                                    <strong>E-mail:</strong> {client.email} <br />
                                    {client.company && (
                                        <>
                                            <strong>Empresa:</strong> {client.company}
                                        </>
                                    )}
                                </Col>
                            </Row>
                        )}
                    </ListGroup>


                    <Tabs defaultActiveKey="details" className="mt-4">
                        <Tab eventKey="details" title="Detalhes">
                            {/* Conteúdo dos detalhes do projeto */}
                        </Tab>
                        <Tab eventKey="proposals" title="Propostas">
                            <h4 className="mt-3">Propostas Recebidas</h4>
                            {proposals.length > 0 ? (
                                proposals.map((proposal) => (
                                    <Card key={proposal.id} className="mb-3">
                                        <Card.Body>
                                            <Card.Text>
                                                <Button href={`/profile/${proposal.freelancer_id}`} variant="outline-dark">
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
                              <ProposalForm project_id={Number(id)} freelancer_id={1} />
                            }
                        </Tab>
                    </Tabs>

                    <Button  href={"/projects"} variant="primary" className="mt-3">
                        Voltar para Projetos
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProjectDetails;