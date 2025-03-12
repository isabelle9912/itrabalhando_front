import { z } from 'zod';

// Esquema para projetos
export const projectSchema = z.object({
    title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres'),
    description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
    budget: z.number().min(1, 'O orçamento deve ser maior que 0'),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val))),
    skillsRequired: z.array(z.string()).nonempty('Selecione pelo menos uma habilidade'),
    client_id: z.string(), // ID do cliente que publicou o projeto
});

// Tipo inferido do esquema
export type ProjectFormData = z.infer<typeof projectSchema>;

// Tipo para projetos com ID (usado no contexto)
export type Project = ProjectFormData & { id: string };