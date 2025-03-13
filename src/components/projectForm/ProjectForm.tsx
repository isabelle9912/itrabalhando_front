import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectCreateSchema } from '../../schemas/project.schema.ts';
import { useProjectContext } from '../../context/ProjectContext';
import { Button, Form } from 'react-bootstrap';
import {iProjectCreate} from "../../interfaces/project.interface.ts";
import {useUserContext} from "../../context/UserContext.tsx";

type ProjectFormProps = {
    onSubmitSuccess?: () => void;
};

const ProjectForm = ({ onSubmitSuccess }: ProjectFormProps) => {
    const { addProject } = useProjectContext();
    const { user } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iProjectCreate>({
        resolver: zodResolver(projectCreateSchema),
    });

    const onSubmit = (data: iProjectCreate) => {
        if (user && localStorage.getItem("@ROLE") == "client") {
            const projectData = {
                ...data,
                client_id: user.id, // Adiciona o client_id
            };
            addProject(projectData);
            alert('Projeto publicado com sucesso!');
            onSubmitSuccess?.();
        }
    };


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" {...register('title')} />
                {errors.title && <span className="text-danger">{errors.title.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3} {...register('description')} />
                {errors.description && (
                    <span className="text-danger">{errors.description.message}</span>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Orçamento (R$)</Form.Label>
                <Form.Control type="number" {...register('budget', { valueAsNumber: true })} />
                {errors.budget && <span className="text-danger">{errors.budget.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Prazo</Form.Label>
                <Form.Control type="date" {...register('deadline')} />
                {errors.deadline && (
                    <span className="text-danger">{errors.deadline.message}</span>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Habilidades Requeridas</Form.Label>
                <Form.Control
                    type="text"
                    {...register('skillsRequired')}
                    placeholder="Separe as habilidades por vírgula"
                />
                {errors.skillsRequired && (
                    <span className="text-danger">{errors.skillsRequired.message}</span>
                )}
            </Form.Group>

            <Button type="submit" variant="primary">
                Publicar Projeto
            </Button>
        </Form>
    );
};

export default ProjectForm;