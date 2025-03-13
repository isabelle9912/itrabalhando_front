import { Container, Row, Col, Button } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import CardFrelancer from "../../components/cardFreelancer/CardFreelancer.tsx";
import {useEffect, useState} from "react";
import {iFreelancer} from "../../interfaces/freelancer.interface.ts";

const Home = () => {
    const { retrieveFreelancers } = useUserContext();
    const [freelancers, setFreelancers] = useState<iFreelancer[]>([]);

    useEffect(() => {
        const getFreelancers = async () => {
            const freelancers = await retrieveFreelancers();
            setFreelancers(freelancers);
        };

        getFreelancers();
    }, []);

    // Filtra apenas freelancers
    const freelancersFilter = freelancers
        .slice(0, 15); // Exibe apenas os 15 primeiros freelancers

    return (
        <Container className="mt-4">
            {/* Seção de Boas-Vindas */}
            <Row className="py-4 mb-5 text-center">
                <Col>
                    <h1>Bem-vindo à Plataforma Itrabalhando</h1>
                    <p className="lead">
                        Conectamos empresas e clientes locais aos melhores profissionais autônomos da região.
                    </p>
                    <Button href="/freelancers" variant="primary" size="lg">
                        Encontre um Freelancer
                    </Button>
                </Col>
            </Row>

            {/* Destaque de Freelancers */}
            <Row className="mb-5">
                <Col>
                    <h2 className="mb-4">Freelancers em Destaque</h2>
                    <Row>
                        {freelancersFilter.map((freelancer) => {
                            return (
                                <Col key={freelancer.id} md={4} className="mb-4">
                                    <CardFrelancer id={freelancer.id} name={freelancer.name} bio={freelancer.bio} email={freelancer.email} image={freelancer.image} skills={freelancer.skills}/>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>

            {/* Chamada para Ação */}
            <Row className="mb-5 text-center">
                <Col>
                    {localStorage.getItem("@ROLE") == "client" && (
                        <>
                            <h2>Precisa de um serviço?</h2>
                            <p>Publique seu projeto e receba propostas de freelancers qualificados.</p>

                            {/* Botão para criar novo projeto */}
                                <Button href="/create-project" variant="success" className="mb-4">
                                    Publicar Projeto
                                </Button>
                        </>
                    )}
                    {localStorage.getItem("@ROLE") == "freelancer" && (
                        <>
                            <h2>Procurando um serviço?</h2>
                            <p>Veja projetos e faça propostas para cliente.</p>

                            {/* Botão para ver projetos */}
                            <Button href="/projects" variant="success" className="mb-4">
                                Ver Projetos
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
