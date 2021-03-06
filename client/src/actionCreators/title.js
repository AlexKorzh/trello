import {
    UPDATE_TITLE,
    GET_TITLE
} from '../actionTypes';

export const updateTitle = payload => {
    return {
        type: UPDATE_TITLE,
        payload
    }
}

export const getTitle = payload => {
    return {
        type: GET_TITLE,
        payload
    }
}
