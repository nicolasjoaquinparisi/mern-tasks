import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    const { selectProject } = useContext(projectContext);
    const { getProjectTasks } = useContext(TaskContext);
    
    const { name } = project;

    const handleClick = () => {
        selectProject(project);
        getProjectTasks(project._id);
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