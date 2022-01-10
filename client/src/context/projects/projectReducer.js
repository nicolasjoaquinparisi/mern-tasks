import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_ERROR,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    DELETE_ERROR
} from "../../types";

const ProjectReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                form: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formError: false
            }
        case PROJECT_ERROR:
            return {
                ...state,
                formError: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: action.payload
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case DELETE_ERROR:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default ProjectReducer;