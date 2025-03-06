import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserProvider} from "./context/UserContext.tsx";
import {ProjectProvider} from "./context/ProjectContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
      </UserProvider>
  </StrictMode>,
)
