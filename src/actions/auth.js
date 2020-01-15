import axios from 'axios';
import {setAlert} from './alert';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

export const login = ({username, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const admin = {
        username,
        password
    }

    try{
        const res = await axios.post('https://beejee-task-api.herokuapp.com/login', JSON.stringify(admin), config);
        dispatch(setAlert('Вы успешно вошли в систему', 'success'));

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.headers.authorization.replace("Bearer ","")
            }
        });
    } catch(err) {
        
        dispatch(setAlert(err.response.data.message.username, 'danger'));

        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch(setAlert('Вы вышли из системы', 'danger'));

    dispatch({type: LOGOUT});
}