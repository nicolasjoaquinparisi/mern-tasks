import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from "../../context/tasks/taskContext";

const Task = ({task}) => {
    
    const { name, state } = task;

    const { project } = useContext(projectContext);
    const { deleteTask, getProjectTasks, updateTask, selectTask } = useContext(TaskContext);

    const handleClickDelete = () => {
        deleteTask(task._id, project._id);
        getProjectTasks(project._id);
    }

    const handleClickState = () => {
        task.state = !task.state;
        
        updateTask(task);
    }

    const handleClickEdit = () => {
        selectTask(task);
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
                            onClick={handleClickState}
                        >
                            Completed
                        </button>
                    :
                    <button
                        type="button"
                        className="incompleto"
                        onClick={handleClickState}
                    >
                        Uncompleted
                    </button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={handleClickEdit}
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