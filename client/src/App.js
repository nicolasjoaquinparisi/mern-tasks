import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';

import tokenAuth from './config/tokenAuth';

import PrivateRoute from './components/routes/PrivateRoute';

// Verificar si existe un token
const token = localStorage.getItem('token');
if (token) {
    tokenAuth(token);
}

const App = () => {
    return (
        <ProjectState>
            <TaskState>
                <AlertState>
                    <AuthState>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/new-account" element={<NewAccount />} />
                                <Route path="/projects" element={<PrivateRoute />} >
                                    <Route path="/projects" element={<Projects />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </AuthState>
                </AlertState>
            </TaskState>
        </ProjectState>
    );
}
 
export default App;