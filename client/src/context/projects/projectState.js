import { useReducer } from "react";
import projectContext from "./projectContext";
import ProjectReducer from "./projectReducer";
import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_ERROR,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = props => {

    // Estado inicial de la aplicación
    const initialState = {
        projects: [],
        form: false,
        formError: false,
        project: null
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(ProjectReducer, initialState);

    // Funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            });
        } catch (error) {
            console.log(error);
        }
    }

    const addProject = async project => {
        try {
            const response = await axiosClient.post('/api/projects', project);
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const showError = () => {
        dispatch({
            type: PROJECT_ERROR
        })
    }

    const selectProject = project => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: project
        })
    }

    const deleteProject = async projectId => {
        try {
            axiosClient.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            console.log(error);
        }
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
                selectProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;