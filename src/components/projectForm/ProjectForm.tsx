import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormData, projectSchema } from '../../schemas/projectSchema';
import { useProjectContext } from '../../context/ProjectContext';
import { Button, Form } from 'react-bootstrap';

type ProjectFormProps = {
    onSubmitSuccess?: () => void;
};

const ProjectForm = ({ onSubmitSuccess }: ProjectFormProps) => {
    const { addProject } = useProjectContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    const onSubmit = (data: ProjectFormData) => {
        // Converte a string de habilidades em um array
        const projectData = {
            ...data,
            skillsRequired: data.skillsRequired.split(',').map((skill) => skill.trim()),
        };
        addProject(projectData);
        alert('Projeto publicado com sucesso!');
        onSubmitSuccess?.();
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