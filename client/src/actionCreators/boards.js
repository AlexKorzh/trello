import {
    GET_BOARDS,
    CREATE_BOARD,
    DELETE_BOARD,
    UPDATE_BOARD
} from '../ActionTypes';

export const createBoard = payload => {
    return {
        type: CREATE_BOARD,
        payload
    }
}

export const getBoards = payload => {
    return {
        type: GET_BOARDS,
        payload
    }
}

export const updateBoard = payload => {
    return {
        type: UPDATE_BOARD,
        payload 
    }
}

export const deleteBoard = payload => {
    return {
        type: DELETE_BOARD,
        payload
    }
}
