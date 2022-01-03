import { useReducer } from "react";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import { PROJECT_FORM } from '../../types';

const ProjectState = props => {
    
    const initialState = {
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

    return (
        <projectContext.Provider
            value={{
                form: state.form,
                showForm: showForm
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;