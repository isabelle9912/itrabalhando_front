import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { freelancerSchema, FreelancerFormData } from '../../schemas/userSchema';
import { useUserContext } from '../../context/UserContext';
import { Button, Form } from 'react-bootstrap';

const FreelancerForm = () => {
    const { addFreelancer } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FreelancerFormData>({
        resolver: zodResolver(freelancerSchema),
    });

    const onSubmit = (data: FreelancerFormData) => {
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