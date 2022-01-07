import { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    PROJECT_TASKS,
    ADD_TASK,
    TASK_ERROR,
    DELETE_TASK,
    TASK_STATE,
    CURRENT_TASK,
    UPDATE_TASK
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
        taskError: false,
        currentTask: null
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

    const changeTaskState = task => {
        dispatch({
            type: TASK_STATE,
            payload: task
        })
    }

    const selectTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                currentTask: state.currentTask,

                getProjectTasks,
                addTask,
                validateTask,
                deleteTask,
                changeTaskState,
                selectTask,
                updateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;