import {
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL
} from '../actions/types';

const initialState = {
    username: '',
    email: '',
    text: '',
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type) {
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                ...payload,
            }
        case CREATE_TASK_FAIL:
            return {
                ...state,
            }
        default: 
            return state;
    }
}