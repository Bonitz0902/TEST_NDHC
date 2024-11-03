import axios from 'axios';

import { SAVE_RECORD_REQUEST, SAVE_RECORD_SUCCESS, SAVE_RECORD_FAIL } from './actionTypes';

export const saveRecordRequest = (data) => ({
    type: SAVE_RECORD_REQUEST,
    payload: data
});

export const saveRecordSuccess = (data) => ({
    type: SAVE_RECORD_SUCCESS,
    payload: data,
})

export const saveRecordFail = (error) => ({
    type: SAVE_RECORD_FAIL,
    payload: error
})

export const saveRecord = (data) => {
    return (dispatch) => {
        console.log(data)
        // dispatch(saveRecordRequest());
        axios.post('http://localhost:8080/consolidatedInventory/saveRecord', data)
        .then((response) => {
            console.log('API CALL -------------', response)
            const data = response.data;
            dispatch(saveRecordSuccess(data));
        })
        .catch((error) => {
            dispatch(saveRecordFail(error.message));
        })
    }
}

export const login = async (username, password) => {
    const response = await axios.post(`http://localhost:8080/user/login`, username, password );
    return response.data;
};