import { useReducer } from "react";
import projectContext from "./projectContext";
import reducer from "./projectReducer";
import { v4 } from 'uuid';
import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_ERROR,
    CURRENT_PROJECT
} from '../../types';

const ProjectState = props => {
    
    const projects = [
        { id: 1, name: 'E-Commerce' },
        { id: 2, name: 'Reactive Dungeon' },
        { id: 3, name: 'Reactive Cookie' }
    ];

    // Estado inicial de la aplicación
    const initialState = {
        projects: [],
        form: false,
        formError: false,
        project: null
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(reducer, initialState);

    // Funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    const addProject = project => {
        project.id = v4();

        dispatch({
            type: ADD_PROJECT,
            payload: project
        })
    }

    const showError = () => {
        dispatch({
            type: FORM_ERROR
        })
    }

    const selectProject = project => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: project
        })
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                formError: state.formError,
                project: state.project,

                showForm,
                getProjects,
                addProject,
                showError,
                selectProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;