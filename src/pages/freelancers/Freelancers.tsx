import { useUserContext } from '../../context/UserContext';
import { Container, Row, Col, Form} from 'react-bootstrap';
import { isFreelancer } from '../../utils/typeGuards';
import {useState} from "react";
import CardFrelancer from "../../components/cardFreelancer/CardFreelancer.tsx";

const Freelancers = () => {
    const { users } = useUserContext();
    const [searchTerm, setSearchTerm] = useState('');

    // Filtra freelancers com base no termo de busca
    const filteredFreelancers = users.filter((user) => {
        if (user.type === 'freelancer' && isFreelancer(user.data)) {
            const { name, skills, bio } = user.data;
            const searchTerms = searchTerm.toLowerCase().split(',').map((term) => term.trim());

            return searchTerms.some((term) => {
                return (
                    name.toLowerCase().includes(term) ||
                    skills.join(', ').toLowerCase().includes(term) ||
                    bio.toLowerCase().includes(term)
                );
            });
        }
        return false;
    });


    return (
        <Container>
            <h1 className="my-4">Freelancers</h1>

            {/* Barra de Busca */}
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Buscar freelancers por nome, habilidades ou bio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>

            {/* Lista de Freelancers */}
            {filteredFreelancers.length === 0 ? (
                <p>Nenhum freelancer encontrado com o termo "{searchTerm}".</p>
            ) : (
                <Row>
                    {filteredFreelancers.map((freelancer) => {
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
            )}
        </Container>
    );
};

export default Freelancers;