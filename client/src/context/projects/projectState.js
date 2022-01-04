import { useReducer } from "react";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import { 
    PROJECT_FORM,
    GET_PROJECTS
} from '../../types';

const ProjectState = props => {
    
    const projects = [
        { id: 1, name: 'E-Commerce' },
        { id: 2, name: 'Reactive Dungeon' },
        { id: 3, name: 'Reactive Cookie' }
    ];

    const initialState = {
        projects: [],
        form: false
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(projectReducer, initialState);

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

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,

                showForm: showForm,
                getProjects
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;