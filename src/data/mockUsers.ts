import { FreelancerFormData, ClientFormData } from '../schemas/userSchema';

export const mockFreelancers: FreelancerFormData[] = [
    {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        skills: ['Design Gráfico', 'UI/UX'],
        bio: 'Designer com 5 anos de experiência em criação de interfaces modernas.',
    },
    {
        name: 'Maria Souza',
        email: 'maria.souza@example.com',
        skills: ['Desenvolvimento Web', 'React'],
        bio: 'Desenvolvedora front-end especializada em React e TypeScript.',
    },
    {
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@example.com',
        skills: ['Marketing Digital', 'SEO'],
        bio: 'Especialista em estratégias de marketing digital e SEO.',
    },
];

export const mockClients: ClientFormData[] = [
    {
        name: 'Empresa X',
        email: 'contato@empresax.com',
        company: 'Empresa X Ltda.',
    },
    {
        name: 'Ana Pereira',
        email: 'ana.pereira@example.com',
        company: '',
    },
];