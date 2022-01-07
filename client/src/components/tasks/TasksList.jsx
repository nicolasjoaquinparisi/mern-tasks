import { Fragment, useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TasksList = () => {

    const { project, deleteProject } = useContext(projectContext);
    const { projectTasks } = useContext(TaskContext);

    if (!project) return <h2>Select a Project</h2>

    const handleClick = () => {
        deleteProject(project.id);
    }

    return (
        <Fragment>
            <h2>Project: {project.name}</h2>

            <ul className="listado-tareas">
                {
                    projectTasks.length === 0 ?
                    <li className="tarea">There are no tasks</li>
                    :
                    <TransitionGroup>
                    {
                        projectTasks.map(task => (
                            <CSSTransition
                                key={task.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Task
                                    task={task}
                                />
                            </CSSTransition>
                        ))
                    }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ () => { handleClick() }}
            >
                Delete Project &times;
            </button>
        </Fragment>
    );
}
 
export default TasksList;