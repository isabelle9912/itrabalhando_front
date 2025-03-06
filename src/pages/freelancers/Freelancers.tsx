import { useUserContext } from '../../context/UserContext';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FreelancerFormData } from '../../schemas/userSchema';

const Freelancers = () => {
    const { users } = useUserContext();

    // Filtra apenas freelancers e faz a verificação de tipo
    const freelancers = users.filter((user) => {
        if (user.type === 'freelancer') {
            return true;
        }
        return false;
    });

    return (
        <Container>
            <h1 className="my-4">Freelancers</h1>
            <Row>
                {freelancers.map((freelancer) => {
                    // Garante que o tipo é FreelancerFormData
                    const freelancerData = freelancer.data as FreelancerFormData;

                    return (
                        <Col key={freelancer.id} md={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{freelancerData.name}</Card.Title>
                                    <Card.Text>{freelancerData.bio}</Card.Text>
                                    <Card.Text>
                                        <strong>Habilidades:</strong> {freelancerData.skills.join(', ')}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>E-mail:</strong> {freelancerData.email}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default Freelancers;