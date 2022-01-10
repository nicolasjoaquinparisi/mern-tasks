import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = () => {

    const navigate = useNavigate();

    const { alert, showAlert } = useContext(AlertContext);

    const { message, authenticated, logIn }= useContext(AuthContext);

    // En de que el password o el usuario no exista
    useEffect(() => {
    
        if (authenticated) {
            navigate('/projects');
        }

        if (message) {
            showAlert(message.msg, message.category);
        }

    }, [message, authenticated, navigate]);
    
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validar campos vacíos
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All the fields are required', 'alerta-error');
            return;
        }

        // Pasarlo al action
        logIn({email, password});
    }

    return (
        <div className="form-usuario">
            {
                (alert) ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Log In</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Log In"
                        />
                    </div>
                </form>

                <Link
                    to="/new-account"
                    className="enlace-cuenta"
                >
                    Create account
                </Link>
            </div>
        </div>
    );
}
 
export default Login;