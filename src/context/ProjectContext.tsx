import { createContext, useContext, useState } from 'react';
import { Project, ProjectFormData } from '../schemas/projectSchema';
import { mockProjects } from '../data/mockProjects';

type ProjectContextType = {
    projects: Project[];
    addProject: (project: ProjectFormData) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>(mockProjects);

    const addProject = (project: ProjectFormData) => {
        const newProject: Project = {
            ...project,
            id: String(projects.length + 1), // Gera um ID único
        };
        setProjects((prev) => [...prev, newProject]);
    };

    return (
        <ProjectContext.Provider value={{ projects, addProject }}>
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