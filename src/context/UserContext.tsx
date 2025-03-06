import { createContext, useContext, useState } from 'react';
import { FreelancerFormData, ClientFormData } from '../schemas/userSchema';
import { mockFreelancers, mockClients } from '../data/mockUsers';

type User = {
    id: string;
    type: 'freelancer' | 'client';
    data: FreelancerFormData | ClientFormData;
};

type UserContextType = {
    users: User[];
    addFreelancer: (freelancer: FreelancerFormData) => void;
    addClient: (client: ClientFormData) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    // Carrega dados mockados ao inicializar
    const [users, setUsers] = useState<User[]>(() => {
        const freelancers: User[] = mockFreelancers.map((freelancer, index) => ({
            id: `f-${index + 1}`,
            type: 'freelancer',
            data: freelancer,
        }));

        const clients: User[] = mockClients.map((client, index) => ({
            id: `c-${index + 1}`,
            type: 'client',
            data: client,
        }));

        return [...freelancers, ...clients];
    });

    const addFreelancer = (freelancer: FreelancerFormData) => {
        const newUser: User = {
            id: `f-${users.length + 1}`,
            type: 'freelancer',
            data: freelancer,
        };
        setUsers((prev) => [...prev, newUser]);
    };

    const addClient = (client: ClientFormData) => {
        const newUser: User = {
            id: `c-${users.length + 1}`,
            type: 'client',
            data: client,
        };
        setUsers((prev) => [...prev, newUser]);
    };

    return (
        <UserContext.Provider value={{ users, addFreelancer, addClient }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};