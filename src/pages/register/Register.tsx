import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import ClientForm from "../../components/clientForm/ClientForm.tsx";
import FreelancerForm from "../../components/freelancerForm/FreelancerForm.tsx";

const RegisterPage: React.FC = () => {
    const [userType, setUserType] = useState<"client" | "freelancer">("client");

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Registro</h2>
                    {/* Seletor de Tipo de Usuário */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Usuário</Form.Label>
                        <Form.Select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value as "client" | "freelancer")}
                        >
                            <option value="client">Cliente</option>
                            <option value="freelancer">Freelancer</option>
                        </Form.Select>
                    </Form.Group>

                    {/* form para Cliente */}
                    {userType === "client" && (
                        <ClientForm/>
                    )}

                    {/* Campos Específicos para Freelancer */}
                    {userType === "freelancer" && (
                        <FreelancerForm/>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;