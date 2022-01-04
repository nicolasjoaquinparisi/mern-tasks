import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const Project = ({project}) => {

    const { selectProject } = useContext(projectContext);
    
    const { name } = project;

    const handleClick = () => {
        selectProject(project);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={handleClick}
            >
                {name}
            </button>
        </li>
    );
}
 
export default Project;