import NewProject from "../projects/NewProject";
import ProjectList from "../projects/ProjectList";

const SideBar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>

            <NewProject />

            <div className="proyectos">
                <h2>Your projects</h2>
                <ProjectList />
            </div>
        </aside>
    );
}
 
export default SideBar;