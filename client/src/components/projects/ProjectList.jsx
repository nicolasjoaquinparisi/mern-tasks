import { useEffect, useContext } from 'react';
import Project from "./Project";
import projectContext from '../../context/projects/projectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ProjectList = () => {

    const { projects, getProjects } = useContext(projectContext);

    useEffect(() => {
        getProjects();
    }, []);

    if (projects.length === 0) return <p>There are no Projects. Let's create one.</p>;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
            {
                projects.map(project => (
                    <CSSTransition
                        key={project.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project
                            project={project}
                        />
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
        </ul>
    );
}
 
export default ProjectList;