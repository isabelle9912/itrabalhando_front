import { Container, Row, Col, Button } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import CardFrelancer from "../../components/cardFreelancer/CardFreelancer.tsx";
import {isFreelancer} from "../../utils/typeGuards.ts";

const Home = () => {
    const { users } = useUserContext();

    // Filtra apenas freelancers
    const freelancers = users
        .filter((user) => user.type === 'freelancer')
        .slice(0, 3); // Exibe apenas os 3 primeiros freelancers

    return (
        <Container className="mt-4">
            {/* Seção de Boas-Vindas */}
            <Row className="py-4 mb-5 text-center">
                <Col>
                    <h1>Bem-vindo à Plataforma de Freelancers de Itabaiana</h1>
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
                        {freelancers.map((freelancer) => {
                            if (isFreelancer(freelancer.data)) {
                                return (
                                    <Col key={freelancer.id} md={4} className="mb-4">
                                        <CardFrelancer id={freelancer.id} name={freelancer.data.name} bio={freelancer.data.bio} email={freelancer.data.email} image={freelancer.image} skills={freelancer.data.skills}/>
                                    </Col>
                                );
                            }
                            return null;
                        })}
                    </Row>
                </Col>
            </Row>

            {/* Chamada para Ação */}
            <Row className="mb-5 text-center">
                <Col>
                    <h2>Precisa de um serviço?</h2>
                    <p>Publique seu projeto e receba propostas de freelancers qualificados.</p>

                    {/* Botão para criar novo projeto */}
                    <Button href="/create-project" variant="success" className="mb-4">
                        Publicar Projeto
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;