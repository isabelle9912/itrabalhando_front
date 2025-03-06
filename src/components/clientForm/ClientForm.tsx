import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientFormData } from '../../schemas/userSchema';
import { useUserContext } from '../../context/UserContext';
import { Button, Form } from 'react-bootstrap';

const ClientForm = () => {
    const { addClient } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
    });

    const onSubmit = (data: ClientFormData) => {
        addClient(data);
        alert('Client cadastrado com sucesso!');
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
                <Form.Label>Empresa</Form.Label>
                <Form.Control type="text" {...register('company')} />
                {errors.company && <span className="text-danger">{errors.company.message}</span>}
            </Form.Group>

            <Button type="submit" variant="primary">
                Cadastrar
            </Button>
        </Form>
    );
};

export default ClientForm;