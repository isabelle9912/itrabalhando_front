import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { Card, Container, Button } from 'react-bootstrap';
import { isFreelancer, isClient } from '../../utils/typeGuards';
import ProfileImgName from "../../components/profileImgName/ProfileImgName.tsx";
import {useEffect, useState} from "react";
import {iClient} from "../../interfaces/client.interface.ts";
import {iFreelancer} from "../../interfaces/freelancer.interface.ts";

const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<iClient | iFreelancer | null>()
    const { retriveUser } = useUserContext();

    useEffect(() => {
        const getUser = async () => {
            const user = await retriveUser(Number(id));
            setUser(user);
        }

        getUser();
    }, [retriveUser]);
    if (!user) {
        return <Container className="mt-4">Perfil não encontrado.</Container>;
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <ProfileImgName id={user.id} name={user.name} image={user?.image} />
                    {isFreelancer(user) && (
                        <>
                            <Card.Text>{user.bio}</Card.Text>
                            <Card.Text>
                                <strong>Habilidades:</strong> {user.skills.join(', ')}
                            </Card.Text>
                        </>
                    )}
                    {isClient(user) && (
                        <Card.Text>
                            <strong>Empresa:</strong> {user.company || 'N/A'}
                        </Card.Text>
                    )}
                    <Card.Text>
                        <strong>E-mail:</strong> {user.email}
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