import { z } from 'zod';

// Esquema para freelancers
export const freelancerSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    skills: z.array(z.string()).nonempty('Selecione pelo menos uma habilidade'),
    bio: z.string().min(10, 'A bio deve ter pelo menos 10 caracteres'),
    image: z.string().optional(),
});

// Esquema para clientes
export const clientSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    company: z.string().optional(),
    image: z.string().optional(),
});

// Tipos inferidos dos esquemas
export type FreelancerFormData = z.infer<typeof freelancerSchema>;
export type ClientFormData = z.infer<typeof clientSchema>;