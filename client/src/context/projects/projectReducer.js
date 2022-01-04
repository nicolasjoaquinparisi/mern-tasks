import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_ERROR
} from "../../types";

const reducer = (state, action) => {
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
        case FORM_ERROR:
            return {
                ...state,
                formError: true
            }
        default:
            return state;
    }
}

export default reducer;