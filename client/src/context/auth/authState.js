import { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const signIn = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            console.log(response.data);

            dispatch({
                type: SIGNIN_SUCCESS,
                payload: response.data
            });

            // Obtener usuario
            getAuthenticatedUser();
        }
        catch (error) {

            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: SIGNIN_ERROR,
                payload: alert
            })
        }
    }

    // Retornar usuario autenticado
    const getAuthenticatedUser = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            // Enviar el token por headers
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');

            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // LogIn
    const logIn = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            
            dispatch ({
                type: LOGIN_SUCCESS,
                payload: response.data
            });

            getAuthenticatedUser();
        } catch (error) {
            console.log(error.response.data.msg);
            
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    // Cerrar sesión
    const logOut = () => {
        dispatch({
            type: LOGOUT
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,

                signIn,
                logIn,
                getAuthenticatedUser,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;