import { useState } from 'react';

const Login = () => {
    
    const [ use, setUser ] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;

    const onChange = e => {

    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <form>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={email}
                            onChange={onChange}
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
                            onChange={onChange}
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
            </div>
        </div>
    );
}
 
export default Login;