import {Button, Container, Form} from "react-bootstrap";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {useUserContext} from "../../context/UserContext.tsx";
import {iLogin} from "../../interfaces/login.interface.ts";
import {loginSchema} from "../../schemas/login.schema.ts";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { userLogin } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iLogin>({
        resolver: zodResolver(loginSchema),
    });

    const submitLogin: SubmitHandler<iLogin> = (loginData : iLogin) => {
        userLogin(loginData);
        navigate("/")
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Login</h2>
            <Form onSubmit={handleSubmit(submitLogin)}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu email"
                        {...register('email')}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        {...register('password')}
                    />
                </Form.Group>
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                <Button variant="primary" type="submit" className="mt-2">
                    Entrar
                </Button>
            </Form>
        </Container>
    )
}