import {
    UPDATE_TITLE,
    GET_TITLE
} from '../constants/ActionTypes';
import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';

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

export const fetchTitleMiddleware = (boardId) => dispatch => {debugger;
    let authorization = token.get();

    axios.get(
        `${currentHost}/getBoardtitle`,
        {
            headers: { authorization },
            params: {
                boardId: boardId  
            }
        }
    ).then(function (response) {debugger;
        const title = response.data.board.title;

        dispatch(getTitle(title));
    })
};
