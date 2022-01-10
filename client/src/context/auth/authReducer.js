import {
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from "../../types";

const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case SIGNIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: true
            }
        case LOGOUT:
        case LOGIN_ERROR:
        case SIGNIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                message: action.payload,
                authenticated: null,
                user: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        default:
            return state;
    }
}

export default AuthReducer;