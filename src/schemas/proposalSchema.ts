import { z } from 'zod';

// Esquema para propostas
export const proposalSchema = z.object({
    freelancerId: z.string(), // ID do freelancer que enviou a proposta
    projectId: z.string(), // ID do projeto
    message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
    budget: z.number().min(1, 'O orçamento deve ser maior que 0'),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val))), // Valida se é uma data válida
});

// Tipo inferido do esquema
export type ProposalFormData = z.infer<typeof proposalSchema>;

// Tipo para propostas com ID (usado no contexto)
export type Proposal = ProposalFormData & { id: string };