import { useEffect, useContext } from 'react';
import SideBar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import TaskForm from "../tasks/TaskForm";
import TasksList from "../tasks/TasksList";
import AuthContext from '../../context/auth/authContext';

const Projects = () => {
    
    const { getAuthenticatedUser } = useContext(AuthContext);

    useEffect(() => {
        getAuthenticatedUser();
    }, []);
    
    return (
        <div className="contenedor-app">
            <SideBar />

            <div className="seccion-principal">
                <Bar />
                
                <main>
                    <TaskForm />

                    <div className="contenedor-tareas">
                        <TasksList />
                    </div>
                </main>
            </div>

        </div>
    );
}
 
export default Projects;