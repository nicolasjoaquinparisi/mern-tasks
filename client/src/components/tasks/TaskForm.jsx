import { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import { v4 } from 'uuid';

const TaskForm = () => {

    const { project } = useContext(projectContext);
    const { taskError, addTask, validateTask, getProjectTasks } = useContext(TaskContext);

    // State para la nueva tarea
    const [ task, setTask ] = useState({
        name: ''
    });

    const { name } = task;

    if (!project) return null;

    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if (name.trim() === '') {
            validateTask();
            return;
        }

        // Pasar la validación

        // Agregar nueva tarea al state de tareas
        task.id = v4();
        task.projectId = project.id;
        task.state = false;
        addTask(task);

        // Reiniciar form
        setTask({
            name: ''
        });

        // Obtener tareas del proyecto actual con la nueva tarea
        getProjectTasks(project.id);
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
                        value="Add Task"
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