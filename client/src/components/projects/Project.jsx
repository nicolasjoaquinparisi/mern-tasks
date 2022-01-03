const Project = ({project}) => {

    const { name } = project;

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
            >
                {name}
            </button>
        </li>
    );
}
 
export default Project;