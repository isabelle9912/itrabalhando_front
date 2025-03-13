import {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {api} from "../api/api.ts";
import {iClient, iClientCreate, iClientWithoutPass} from "../interfaces/client.interface.ts";
import {iFreelancer, iFreelancerCreate, iFreelancerWithoutPass} from "../interfaces/freelancer.interface.ts";
import {iLogin} from "../interfaces/login.interface.ts";

type UserContextType = {
    loading: boolean;
    userLogin: (formData: iLogin) => void;
    userLogout: () => void;
    user: iClientWithoutPass | iFreelancerWithoutPass | null;
    retriveUser: (id: number) => Promise<iFreelancer | iClient | null>
    retriveFreelancer: (id: number) => Promise<iFreelancer | null>;
    retriveClient: (id: number) => Promise<iClient | null>;
    retrieveFreelancers: () => Promise<iFreelancer[] | []>;
    retrieveClients: () => Promise<iClient[] | []>;
    addFreelancer: (freelancer: iFreelancerCreate) => void;
    addClient: (client: iClientCreate) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    // Carrega dados mockados ao inicializar
    const [user, setUser] = useState<iClientWithoutPass | iFreelancerWithoutPass | null>(null);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("@TOKEN"),
                user_id = localStorage.getItem("@USER_ID"),
                role = localStorage.getItem("@ROLE");

            if (!token) {
                //setLoading(false);
                navigate("/login");
                return;
            }

            try {
                api.defaults.headers.common.authorization = `Bearer ${token}`;

                getUser(user_id, role);
            } catch (error) {
                console.log(error);
                localStorage.clear();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const userLogin = async (data: iLogin) => {
        try {
            const response = await api.post(`/login/user`, data);
            const { accessToken, User: userData, role: userRole } = response.data;
            localStorage.setItem("@TOKEN", accessToken);
            localStorage.setItem("@USER_ID", userData.id);
            localStorage.setItem("@ROLE", userRole);


            setUser(userData);
            api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
        } catch (error) {
            console.log(error);
        }
    };

    const userLogout = () => {
        localStorage.clear();

        setUser(null);
        navigate("/login");
    };

    const getUser = async (id: string | null, role: string | null) => {
        try {
            const response = await api.get(`/${role}/${id}`);
            const userData = response.data;

            setUser(userData);
            return userData;
        } catch (error) {
            console.log(error);
        }
    };

    const retriveUser = async (id: number): Promise<iFreelancer | iClient | null> => {
        const freelancer = await retriveFreelancer(id);
        if (freelancer) { return freelancer} else {
            const client = await retriveClient(id);
            return client;
        }
    };

    const retriveFreelancer = async (id: number): Promise<iFreelancer | null> => {
        const response = await api.get(`/freelancer/${id}`);
        return response.data;
    };

    const retriveClient = async (id: number): Promise<iClient | null> => {
        const response = await api.get(`/client/${id}`);
        return response.data;
    };

    const retrieveFreelancers = async (): Promise<iFreelancer[] | []> => {
        const response = await api.get(`/freelancer`);
        return response.data;
    }

    const retrieveClients = async (): Promise<iFreelancer[] | []> => {
        const response = await api.get(`/client`);
        return response.data;
    }

    const addFreelancer = async (freelancer: iFreelancerCreate) => {
        const response = await api.post("/freelancer", {freelancer})
        setUser(response.data);
    };

    const addClient = async (client: iClientCreate) => {
        const response = await api.post("/client", {client})
        setUser(response.data);
    };

    return (
        <UserContext.Provider value={{
            loading,
            userLogin,
            userLogout,
            user,
            retriveUser,
            retriveFreelancer,
            retriveClient,
            retrieveFreelancers,
            retrieveClients,
            addFreelancer,
            addClient }}>
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