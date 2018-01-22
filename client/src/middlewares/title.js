import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';

import {
    UPDATE_TITLE,
    GET_TITLE
} from '../actionTypes';

import {
    updateTitle,
    getTitle
} from '../actionCreators/title';

export const fetchTitleMiddleware = (boardId) => dispatch => {
    let authorization = token.get();

    axios.get(
        `${currentHost}/getBoardtitle`,
        {
            headers: { authorization },
            params: {
                boardId: boardId  
            }
        }
    ).then(function (response) {
        const title = response.data.board.title;

        dispatch(getTitle(title));
    })
};
