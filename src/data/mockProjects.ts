import { Project } from '../schemas/projectSchema';

export const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Desenvolvimento de Site Institucional',
        description: 'Precisamos de um site moderno para nossa empresa.',
        budget: 5000,
        deadline: '2023-12-31',
        skillsRequired: ['Desenvolvimento Web', 'React', 'TypeScript'],
        clientId: 'c-1', // ID do cliente que publicou o projeto
    },
    {
        id: '2',
        title: 'Design de Logotipo',
        description: 'Precisamos de um logotipo criativo para nossa marca.',
        budget: 1000,
        deadline: '2023-11-15',
        skillsRequired: ['Design Gráfico', 'Illustrator'],
        clientId: 'c-2',
    },
];