import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import { FreelancerFormData } from '../../schemas/userSchema';
import ProfileImgName from "../../components/profileImgName/ProfileImgName.tsx";

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
                            const freelancerData = freelancer.data as FreelancerFormData;

                            return (
                                <Col key={freelancer.id} md={4} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <ProfileImgName id={freelancer.id} name={freelancer.data.name} image={freelancer.image}/>
                                            <Card.Text>{freelancerData.bio}</Card.Text>
                                            <Card.Text>
                                                <strong>Habilidades:</strong> {freelancerData.skills.join(', ')}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
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