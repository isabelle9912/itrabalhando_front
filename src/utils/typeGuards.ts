import { FreelancerFormData, ClientFormData } from '../schemas/userSchema';

// Verifica se o objeto é um FreelancerFormData
export function isFreelancer(data: FreelancerFormData | ClientFormData): data is FreelancerFormData {
    return (data as FreelancerFormData).bio !== undefined;
}

// Verifica se o objeto é um ClientFormData
export function isClient(data: FreelancerFormData | ClientFormData): data is ClientFormData {
    return (data as ClientFormData).company !== undefined;
}