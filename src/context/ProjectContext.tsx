import { createContext, useContext } from 'react';
import {iProject, iProjectCreate} from "../interfaces/project.interface.ts";
import {iProposal, iProposalCreate} from "../interfaces/proposal.interface.ts";
import {api} from "../api/api.ts";

type ProjectContextType = {
    addProject: (project: iProjectCreate) => void;
    addProposal: (proposal: iProposalCreate) => void;
    retrieveProject: (id: number) => Promise<iProject>;
    retrieveProjects: () => Promise<iProject[]>;
    retrieveProposals: (project_id: number) => Promise<iProposal[] | []>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {


    const addProject = async (project: iProjectCreate) => {
        await api.post("/project", project);

    };

    const addProposal = async (proposal: iProposalCreate) => {
        await api.post("/proposal", proposal);
    };

    const retrieveProject = async (id: number): Promise<iProject> => {
        const response = await api.get(`/project/${id}`);
        return response.data;
    }

    const retrieveProjects = async (): Promise<iProject[]> => {
        const response = await api.get(`/project/`);
        return response.data;
    }

    const retrieveProposals = async (project_id: number): Promise<iProposal[] | []> => {
        const response = await api.get(`/proposal/all/${project_id}`);
        return response.data;
    }

    return (
        <ProjectContext.Provider value={{ addProject, addProposal, retrieveProject, retrieveProjects, retrieveProposals }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
};