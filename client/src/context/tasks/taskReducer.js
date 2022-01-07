import {
    ADD_TASK,
    PROJECT_TASKS,
    TASK_ERROR,
    DELETE_TASK,
    TASK_STATE,
    CURRENT_TASK,
    UPDATE_TASK
} from "../../types";

const TaskReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: state.tasks.filter(task => task.projectId === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [ action.payload, ...state.tasks ],
                taskError: false
            }
        case TASK_ERROR:
            return {
                ...state,
                taskError: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case TASK_STATE:
            return {
                ...state,
                tasks: state.projectTasks.map(task => task.id === action.payload.id ? action.payload : task)
            }
        case CURRENT_TASK:
            return {
                ...state,
                currentTask: action.payload
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.projectTasks.map(task => task.id === action.payload.id ? action.payload : task),
                currentTask: null
            }
        default:
            return state;
    }
}

export default TaskReducer;