import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Bar = () => {

    const { user, getAuthenticatedUser, logOut } = useContext(AuthContext);

    const navigation = useNavigate();

    useEffect(() => {
        getAuthenticatedUser();
    }, []);

    const handleClickLogout = () => {
        logOut();
        navigation('/');
    }

    return (
        <header className="app-header">
            {
                (user) ?
                <p className="nombre-usuario">Hi <span>{user.name}</span></p>
                :
                null
            }

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={handleClickLogout}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
 
export default Bar;