import {
    ADD_TASK,
    PROJECT_TASKS,
    TASK_ERROR,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK
} from "../../types";

const TaskReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                projectTasks: [ action.payload, ...state.projectTasks ],
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
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case CURRENT_TASK:
            return {
                ...state,
                currentTask: action.payload
            }
        case UPDATE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
                currentTask: null
            }
        default:
            return state;
    }
}

export default TaskReducer;