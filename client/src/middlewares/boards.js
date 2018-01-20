import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import { 
    createBoard, 
    updateBoard, 
    deleteBoard, 
    getBoards 
} from '../actionCreators/boards';

import { updateTitle } from '../actionCreators/title';

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
        axios.post(
            `${currentHost}/updateBoard`,
            {boardId, title},
            {headers: { authorization: token.get() }}
        ).then(response => {
            let boardTitle = response.data.board.title;
            dispatch(updateBoard(response.data.board));
            dispatch(updateTitle(boardTitle))
        });
    }
}

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

