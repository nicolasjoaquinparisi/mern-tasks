import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const NewAccount = () => {

    const navigate = useNavigate();

    const { alert, showAlert } = useContext(AlertContext);

    const { message, autenticated, signIn }= useContext(AuthContext);

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        
        if (autenticated) {
            navigate('/projects');
        }

        if (message) {
            showAlert(message.msg, message.category);
        }

    }, [message, autenticated, navigate]);
    
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    const { name, email, password, confirm } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        // Validar que no haya campos vacios
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert('You must complete all fields', 'alerta-error');
            return;
        }

        // Password mínimo de 6 caracteres
        if (password.length < 6) {
            showAlert('The password must contain 6 characters at least', 'alerta-error');
            return;
        }

        // Los 2 passwords deben ser iguales
        if (password !== confirm) {
            showAlert('The passwords are differents', 'alerta-error');
            return;
        }

        // Pasarlo al action
        signIn({ name, email, password });
    }

    return (
        <div className="form-usuario">
            {
                (alert) ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>New Account</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

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
                        <label htmlFor="confirm">Repeat Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repeat your password"
                            value={confirm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Sign Up"
                        />
                    </div>
                </form>

                <Link
                    to="/"
                    className="enlace-cuenta"
                >
                    Log In
                </Link>
            </div>
        </div>
    );
}
 
export default NewAccount;