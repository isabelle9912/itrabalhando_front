import {iFreelancer} from "../interfaces/freelancer.interface.ts";
import {iClient} from "../interfaces/client.interface.ts";

// Verifica se o objeto é um FreelancerFormData
export function isFreelancer(data: iFreelancer | iClient): data is iFreelancer {
    return (data as iFreelancer).bio !== undefined;
}

// Verifica se o objeto é um ClientFormData
export function isClient(data: iFreelancer | iClient): data is iClient {
    return (data as iClient).company !== undefined;
}