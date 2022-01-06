import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from "../../context/tasks/taskContext";

const Task = ({task}) => {
    
    const { name, state } = task;

    const { project } = useContext(projectContext);
    const { deleteTask, getProjectTasks } = useContext(TaskContext);

    const handleClickDelete = () => {
        deleteTask(task.id);
        getProjectTasks(project.id);
    }

    return (
        <li className="tarea sombra">
            <p>{name}</p>

            <div className="estado">
                {
                    state ?
                        <button
                            type="button"
                            className="completo"
                        >
                            Completed
                        </button>
                    :
                    <button
                        type="button"
                        className="incompleto"
                    >
                        Uncompleted
                    </button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={handleClickDelete}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
 
export default Task;