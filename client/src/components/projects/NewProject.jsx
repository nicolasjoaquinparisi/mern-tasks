import { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Se obtiene el form del context
    const { form, formError, showForm, addProject, showError } = useContext(projectContext);

    const [ project, setProject ] = useState({
        name: ''
    });

    const { name } = project;

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validate project
        if (name.trim() === '') {
            showError();
            return;
        }

        // Add to state
        addProject(project);

        // Reset form
        setProject({
            name: ''
        })
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm() }
            >
                New Project
            </button>

            {
                form ?
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="New Project"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />

                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Add Project"
                    />
                </form>
                :
                null
            }

            {
                (formError) ?
                <p className="mensaje error">You must enter the project's name!</p>
                :
                null
            }
        </Fragment>
    );
}
 
export default NewProject;