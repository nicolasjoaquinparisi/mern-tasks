import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = () => {
    
    const { authenticated } = useContext(AuthContext);
    
    return authenticated ? ( <Outlet /> ) : ( <Navigate to='/' /> )
}

export default PrivateRoute;