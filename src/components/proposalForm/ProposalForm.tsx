import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProposalFormData, proposalSchema } from '../../schemas/proposalSchema';
import { useProjectContext } from '../../context/ProjectContext';
import { Button, Form } from 'react-bootstrap';

type ProposalFormProps = {
    projectId: string;
    freelancerId: string;
    onSubmitSuccess?: () => void;
};

const ProposalForm = ({ projectId, freelancerId, onSubmitSuccess }: ProposalFormProps) => {
    const { addProposal } = useProjectContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProposalFormData>({
        resolver: zodResolver(proposalSchema),
        defaultValues: {
            projectId,
            freelancerId,
        },
    });

    const onSubmit = (data: ProposalFormData) => {
        addProposal(data);
        alert('Proposta enviada com sucesso!');
        onSubmitSuccess?.();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Mensagem</Form.Label>
                <Form.Control as="textarea" rows={3} {...register('message')} />
                {errors.message && <span className="text-danger">{errors.message.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Orçamento (R$)</Form.Label>
                <Form.Control type="number" {...register('budget', { valueAsNumber: true })} />
                {errors.budget && <span className="text-danger">{errors.budget.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Prazo de Entrega</Form.Label>
                <Form.Control type="date" {...register('deadline')} />
                {errors.deadline && <span className="text-danger">{errors.deadline.message}</span>}
            </Form.Group>

            <Button type="submit" variant="primary">
                Enviar Proposta
            </Button>
        </Form>
    );
};

export default ProposalForm;