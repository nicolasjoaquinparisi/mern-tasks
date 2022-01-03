import Project from "./Project";

const ProjectList = () => {

    const projects = [
        { name: 'E-Commerce' },
        { name: 'Reactive Dungeon' },
        { name: 'Reactive Cookie' }
    ]

    return (
        <ul className="listado-proyectos">
            {
                projects.map(project => (
                    <Project
                        project={project}
                    />
                ))
            }
        </ul>
    );
}
 
export default ProjectList;