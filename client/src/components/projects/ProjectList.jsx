import { useEffect, useContext } from 'react';
import Project from "./Project";
import projectContext from '../../context/projects/projectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertContext from '../../context/alerts/alertContext';

const ProjectList = () => {

    const { message, projects, getProjects } = useContext(projectContext);
    const { alert, showAlert } = useContext(AlertContext);

    useEffect(() => {

        if (message) showAlert(message.msg, message.category);

        getProjects();
    }, [message]);

    if (projects.length === 0) return <p>There are no Projects. Let's create one.</p>;

    return (
        <ul className="listado-proyectos">

            {
                (alert) ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null
            }

            <TransitionGroup>
            {
                projects.map(project => (
                    <CSSTransition
                        key={project._id}
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