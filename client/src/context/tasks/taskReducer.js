import {
    ADD_TASK,
    PROJECT_TASKS,
    TASK_ERROR,
    DELETE_TASK
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
                tasks: [...state.tasks, action.payload],
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
        default:
            return state;
    }
}

export default TaskReducer;