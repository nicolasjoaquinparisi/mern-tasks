import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';

const App = () => {
    return (
        <ProjectState>
            <TaskState>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/new-account" element={<NewAccount/>} />
                        <Route path="/projects" element={<Projects/>} />
                    </Routes>
                </BrowserRouter>
            </TaskState>
        </ProjectState>
    );
}
 
export default App;