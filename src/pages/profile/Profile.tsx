import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { Card, Container, Button } from 'react-bootstrap';
import { isFreelancer, isClient } from '../../utils/typeGuards';

const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const { users } = useUserContext();

    // Encontra o usuário pelo ID
    const user = users.find((user) => user.id === id);

    if (!user) {
        return <Container className="mt-4">Perfil não encontrado.</Container>;
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>{user.data.name}</Card.Title>
                    {isFreelancer(user.data) && (
                        <>
                            <Card.Text>{user.data.bio}</Card.Text>
                            <Card.Text>
                                <strong>Habilidades:</strong> {user.data.skills.join(', ')}
                            </Card.Text>
                        </>
                    )}
                    {isClient(user.data) && (
                        <Card.Text>
                            <strong>Empresa:</strong> {user.data.company || 'N/A'}
                        </Card.Text>
                    )}
                    <Card.Text>
                        <strong>E-mail:</strong> {user.data.email}
                    </Card.Text>
                    <Button variant="primary" onClick={() => window.history.back()}>
                        Voltar
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;