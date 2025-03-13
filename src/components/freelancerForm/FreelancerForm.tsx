import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { freelancerCreateSchema} from '../../schemas/freelancer.schema.ts';
import { useUserContext } from '../../context/UserContext';
import { Button, Form } from 'react-bootstrap';
import {iFreelancerCreate} from "../../interfaces/freelancer.interface.ts";

const FreelancerForm = () => {
    const { addFreelancer } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iFreelancerCreate>({
        resolver: zodResolver(freelancerCreateSchema),
    });

    const onSubmit = (data: iFreelancerCreate) => {
        addFreelancer(data);
        alert('Freelancer cadastrado com sucesso!');
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" {...register('name')} />
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" {...register('email')} />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" {...register('password')} />
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Habilidades</Form.Label>
                <Form.Control type="text" {...register('skills')} />
                <Form.Text>Separe as habilidades por vírgula.</Form.Text>
                {errors.skills && <span className="text-danger">{errors.skills.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={3} {...register('bio')} />
                {errors.bio && <span className="text-danger">{errors.bio.message}</span>}
            </Form.Group>

            <Button type="submit" variant="primary">
                Cadastrar
            </Button>
        </Form>
    );
};

export default FreelancerForm;