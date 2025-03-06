import { createContext, useContext, useState } from 'react';
import { Project, ProjectFormData } from '../schemas/projectSchema';
import { Proposal, ProposalFormData } from '../schemas/proposalSchema';
import { mockProjects } from '../data/mockProjects';

type ProjectContextType = {
    projects: Project[];
    proposals: Proposal[];
    addProject: (project: ProjectFormData) => void;
    addProposal: (proposal: ProposalFormData) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [proposals, setProposals] = useState<Proposal[]>([]);

    const addProject = (project: ProjectFormData) => {
        const newProject: Project = {
            ...project,
            id: String(projects.length + 1), // Gera um ID único
        };
        setProjects((prev) => [...prev, newProject]);
    };

    const addProposal = (proposal: ProposalFormData) => {
        const newProposal: Proposal = {
            ...proposal,
            id: String(proposals.length + 1), // Gera um ID único
        };
        setProposals((prev) => [...prev, newProposal]);
    };

    return (
        <ProjectContext.Provider value={{ projects,proposals, addProject, addProposal }}>
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