import { useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = () => {
    
    const { authenticated, loading, getAuthenticatedUser } = useContext(AuthContext);

    useEffect(() => {
        getAuthenticatedUser();
    }, [authenticated]);
    
    return (!authenticated && !loading) ? ( <Navigate to='/' /> ): ( <Outlet /> )
}

export default PrivateRoute;