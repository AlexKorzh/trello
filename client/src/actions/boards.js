import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import {
    GET_BOARDS,
    CREATE_BOARD,
    DELETE_BOARD,
    UPDATE_BOARD
} from '../constants/ActionTypes';

import { startFetching, endFetching } from './fetching';
import { updateTitle } from './title';

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

export const createBoardMiddleware = title => {
    return dispatch => {
        axios.post(
            `${currentHost}/createBoard`,
            {title},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(createBoard(response.data.board));
        });
    }
}

export const updateBoardMiddleware = (boardId, title) => {
    return dispatch => {
        // dispatch(startFetching());
        axios.post(
            `${currentHost}/updateBoard`,
            {boardId, title},
            {headers: { authorization: token.get() }}
        ).then(response => {
            let boardTitle = response.data.board.title;
            dispatch(updateBoard(response.data.board));
            // dispatch(endFetching());
            dispatch(updateTitle(boardTitle))
        });
    }
}

export const getBoardsMiddleware = () => dispatch => {
    let authorization = token.get();

    axios.get(
        `${currentHost}/board`,
        {headers: {authorization}}
    ).then(function (response) {
        const boards = response.data.boards;

        dispatch(getBoards(boards));
    })
};

export const deleteBoardMiddleware = boardId => {
    return dispatch => {
        axios.post(
            `${currentHost}/deleteBoard`,
            {boardId},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(deleteBoard(response.data.board));
        });
    }
}
