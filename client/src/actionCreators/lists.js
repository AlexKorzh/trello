import {
    CREATE_LIST,
    GET_LISTS,
    UPDATE_LIST,
    DELETE_LIST,
    SET_BOARD_ID
} from '../actionTypes';

export const createList = payload => {
    return {
        type: CREATE_LIST,
        payload
    }
}

export const getLists = payload => {
    return {
        type: GET_LISTS,
        payload
    }
}

export const setBoardId = id => {
    return {
        type: SET_BOARD_ID,
        id
    }
}

export const updateList = payload => {
    return {
        type: UPDATE_LIST,
        payload
    }
}

export const deleteList = payload => {
    return {
        type: DELETE_LIST,
        payload
    }
}
