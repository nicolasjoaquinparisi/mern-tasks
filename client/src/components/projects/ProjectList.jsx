import { useEffect, useContext } from 'react';
import Project from "./Project";
import projectContext from '../../context/projects/projectContext';

const ProjectList = () => {

    const { projects, getProjects } = useContext(projectContext);

    useEffect(() => {
        getProjects();
    }, []);

    if (projects.length === 0) return <p>There are no Projects. Let's create one.</p>;

    return (
        <ul className="listado-proyectos">
            {
                projects.map(project => (
                    <Project
                        key={project.id}
                        project={project}
                    />
                ))
            }
        </ul>
    );
}
 
export default ProjectList;