import { useUserContext } from '../../context/UserContext';
import { Container, Row, Col, Form} from 'react-bootstrap';
import {useEffect, useState} from "react";
import CardFrelancer from "../../components/cardFreelancer/CardFreelancer.tsx";
import {iFreelancer} from "../../interfaces/freelancer.interface.ts";

const Freelancers = () => {
    const { retrieveFreelancers } = useUserContext();
    const [freelancers, setFreelancers] = useState<iFreelancer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getFreelancers = async () => {
            const freelancers = await retrieveFreelancers();
            setFreelancers(freelancers);
        };

        getFreelancers();
    }, []);


    // Filtra freelancers com base no termo de busca
    const filteredFreelancers = freelancers.filter((freelancer) => {
        const { name, skills, bio } = freelancer;
        const searchTerms = searchTerm.toLowerCase().split(',').map((term) => term.trim());

        return searchTerms.some((term) => {
            return (
                name.toLowerCase().includes(term) ||
                skills.join(', ').toLowerCase().includes(term) ||
                bio.toLowerCase().includes(term)
            );
        });

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
                        return (
                            <Col key={freelancer.id} md={4} className="mb-4">
                                <CardFrelancer id={freelancer.id} name={freelancer.name} bio={freelancer.bio} email={freelancer.email} image={freelancer.image} skills={freelancer.skills}/>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </Container>
    );
};

export default Freelancers;