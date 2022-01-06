import { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    PROJECT_TASKS,
    ADD_TASK,
    TASK_ERROR,
    DELETE_TASK
} from "../../types";
import { v4 } from 'uuid';

const TaskState = props => {

    const initialState = {
        tasks: [
            { id: v4(), name: 'Choose platform', state: true, projectId: 1 },
            { id: v4(), name: 'Choose colors', state: false, projectId: 1 },
            { id: v4(), name: 'Choose payment platforms', state: false, projectId: 1 },
            { id: v4(), name: 'Choose Hosting', state: true, projectId: 1 },

            { id: v4(), name: 'Choose platform', state: true, projectId: 2 },
            { id: v4(), name: 'Choose colors', state: false, projectId: 2 },

            { id: v4(), name: 'Choose colors', state: false, projectId: 3 },
            { id: v4(), name: 'Choose payment platforms', state: false, projectId: 3 },
            { id: v4(), name: 'Choose Hosting', state: true, projectId: 3 }
        ],
        projectTasks: null,
        taskError: false
    }

    const [ state, dispatch ] = useReducer(TaskReducer, initialState);

    const getProjectTasks = projectId => {
        dispatch({
            type: PROJECT_TASKS,
            payload: projectId
        })
    }

    const addTask = task => {
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    const validateTask = () => {
        dispatch({
            type: TASK_ERROR
        })
    }

    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                taskError: state.taskError,

                getProjectTasks,
                addTask,
                validateTask,
                deleteTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;