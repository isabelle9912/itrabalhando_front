import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proposalCreateSchema } from '../../schemas/proposal.schema.ts';
import { useProjectContext } from '../../context/ProjectContext';
import { Button, Form } from 'react-bootstrap';
import {iProposalCreate} from "../../interfaces/proposal.interface.ts";

type ProposalFormProps = {
    project_id: number;
    freelancer_id: number;
    onSubmitSuccess?: () => void;
};

const ProposalForm = ({ project_id, freelancer_id, onSubmitSuccess }: ProposalFormProps) => {
    const { addProposal } = useProjectContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iProposalCreate>({
        resolver: zodResolver(proposalCreateSchema),
        defaultValues: {
            project_id,
            freelancer_id,
        },
    });

    const onSubmit = (data: iProposalCreate) => {
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