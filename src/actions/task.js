import axios from 'axios';
import {setAlert} from './alert';
import {
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
} from './types';

export const createTask = ({username, email, text}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const task = {
        username,
        email,
        text
    }

    try{
        const res = await axios.post('http://localhost:5000/create', JSON.stringify(task), config);
        dispatch({
            type: CREATE_TASK_SUCCESS,
            payload: res.data.message._id
        });
    } catch(err) {
        console.log(err);
        dispatch(setAlert(err.response.data.message.username, 'danger'));

        dispatch({
            type: CREATE_TASK_FAIL,
        })
    }
}