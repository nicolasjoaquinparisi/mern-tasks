import { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    PROJECT_TASKS,
    ADD_TASK,
    TASK_ERROR,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK
} from "../../types";
import axiosClient from '../../config/axios';

const TaskState = props => {

    const initialState = {
        projectTasks: [],
        taskError: false,
        currentTask: null
    }

    const [ state, dispatch ] = useReducer(TaskReducer, initialState);

    const getProjectTasks = async project => {
        try {
            const response = await axiosClient.get('/api/tasks', { params: { project }} );
            dispatch({
                type: PROJECT_TASKS,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    const addTask = async task => {
        try {
            await axiosClient.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validateTask = () => {
        dispatch({
            type: TASK_ERROR
        })
    }

    const deleteTask = async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, {params: { project }});

            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {

        }
    }

    const selectTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const updateTask = async task => {
        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task);

            dispatch({
                type: UPDATE_TASK,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                currentTask: state.currentTask,

                getProjectTasks,
                addTask,
                validateTask,
                deleteTask,
                selectTask,
                updateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;