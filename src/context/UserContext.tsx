import {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {api} from "../api/api.ts";
import {iClient, iClientCreate, iClientWithoutPass} from "../interfaces/client.interface.ts";
import {iFreelancer, iFreelancerCreate, iFreelancerWithoutPass} from "../interfaces/freelancer.interface.ts";
import {iLogin} from "../interfaces/login.interface.ts";

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
            image: freelancer.image,
        }));

        const clients: User[] = mockClients.map((client, index) => ({
            id: `c-${index + 1}`,
            type: 'client',
            data: client,
            image: client.image,
        }));

        return [...freelancers, ...clients];
    });

    const addFreelancer = (freelancer: FreelancerFormData) => {
        const newUser: User = {
            id: `f-${users.length + 1}`,
            type: 'freelancer',
            data: freelancer,
            image: freelancer.image,
        };
        setUsers((prev) => [...prev, newUser]);
    };

    const addClient = (client: ClientFormData) => {
        const newUser: User = {
            id: `c-${users.length + 1}`,
            type: 'client',
            data: client,
            image: client.image,
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