import { useState, useEffect, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const TaskForm = () => {

    const { project } = useContext(projectContext);
    const { taskError, addTask, currentTask, validateTask, getProjectTasks, updateTask } = useContext(TaskContext);

    // State para la nueva tarea
    const [ task, setTask ] = useState({
        name: ''
    });

    const { name } = task;

    useEffect(() => {
        if (currentTask) setTask(currentTask);
    }, [currentTask]);

    if (!project) return null;

    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if (name.trim() === '') {
            validateTask();
            return;
        }

        if (currentTask === null) {
            // Agregar nueva tarea al state de tareas
            task.project = project._id;
            addTask(task);
        } else {
            updateTask(task);
        }

        // Reiniciar form
        setTask({
            name: ''
        });

        // Obtener tareas del proyecto actual con la nueva tarea
        getProjectTasks(project._id);
    }

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]:e.target.value
        });
    }

    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task Name..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value={ (!currentTask) ? "Add Task" : "Edit Task" }
                    />
                </div>
            </form>

            {
                (taskError) ?
                <p className="mensaje error">You must enter the task's name</p>
                :
                null
            }
        </div>
    );
}
 
export default TaskForm;