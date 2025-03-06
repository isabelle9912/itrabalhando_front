import { useUserContext } from '../../context/UserContext';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { isFreelancer } from '../../utils/typeGuards';

const Freelancers = () => {
    const { users } = useUserContext();

    // Filtra apenas freelancers
    const freelancers = users.filter((user) => user.type === 'freelancer');

    return (
        <Container>
            <h1 className="my-4">Freelancers</h1>
            <Row>
                {freelancers.map((freelancer) => {
                    if (isFreelancer(freelancer.data)) {
                        return (
                            <Col key={freelancer.id} md={4} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{freelancer.data.name}</Card.Title>
                                        <Card.Text>{freelancer.data.bio}</Card.Text>
                                        <Card.Text>
                                            <strong>Habilidades:</strong> {freelancer.data.skills.join(', ')}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>E-mail:</strong> {freelancer.data.email}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    }
                    return null;
                })}
            </Row>
        </Container>
    );
};

export default Freelancers;