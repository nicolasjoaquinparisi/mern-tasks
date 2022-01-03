import { Fragment } from 'react';
import Task from './Task';

const TasksList = () => {

    const tasks = [
        { name: 'Choose platform', state: true },
        { name: 'Choose colors', state: false },
        { name: 'Choose payment platforms', state: false },
        { name: 'Choose Hosting', state: true }
    ]

    return (
        <Fragment>
            <h2>Project: E-Commerce</h2>

            <ul className="listado-tareas">
                {
                    tasks.length === 0 ?
                    <li className="tarea">There are no tasks</li>
                    :
                    tasks.map(task => (
                        <Task
                            task={task}
                        />
                    ))
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
            >
                Delete Project &times;
            </button>
        </Fragment>
    );
}
 
export default TasksList;