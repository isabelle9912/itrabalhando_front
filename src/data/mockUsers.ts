import { FreelancerFormData, ClientFormData } from '../schemas/userSchema';

export const mockFreelancers: FreelancerFormData[] = [
    {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        skills: ['Design Gráfico', 'UI/UX'],
        bio: 'Designer com 5 anos de experiência em criação de interfaces modernas.',
        image: "https://media.istockphoto.com/id/1213781338/pt/foto/digital-artist-working-at-home.jpg?b=1&s=612x612&w=0&k=20&c=yrAb8GIGanVi5pcEVVR7AXdLAVo82YbYihAQsCjApG8=",
    },
    {
        name: 'Maria Souza',
        email: 'maria.souza@example.com',
        skills: ['Desenvolvimento Web', 'React'],
        bio: 'Desenvolvedora front-end especializada em React e TypeScript.',
        image: "https://media.istockphoto.com/id/1412569990/pt/foto/programmer-is-coding-and-programming-software.jpg?b=1&s=612x612&w=0&k=20&c=ZZy2aRHKwcZMtAU0-7iw3SmzE_w2XtZxQY61GWWHhwE=",
    },
    {
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@example.com',
        skills: ['Marketing Digital', 'SEO'],
        bio: 'Especialista em estratégias de marketing digital e SEO.',
        image: "https://cdn.pixabay.com/photo/2024/05/06/16/59/ai-generated-8743794_640.png",
    },
];

export const mockClients: ClientFormData[] = [
    {
        name: 'Empresa X',
        email: 'contato@empresax.com',
        company: 'Empresa X Ltda.',
        image: "https://media.istockphoto.com/id/1658693692/pt/foto/rejection-cancellation-decline-voting-no-error-wrong-decision-or-choice-concept-male-hand.jpg?b=1&s=612x612&w=0&k=20&c=4J9nlowuODuu29hnPR3-X_Q0W_-NgaREkyvmL9siiAo=",
    },
    {
        name: 'Ana Pereira',
        email: 'ana.pereira@example.com',
        company: '',
        image: "https://media.istockphoto.com/id/1945472063/pt/foto/portrait-of-a-smiling-woman.jpg?b=1&s=612x612&w=0&k=20&c=Ksj-CXehK5FufShSkBFY8n6Bx9cAb6VyAXSWskYCYtQ=",
    },
];