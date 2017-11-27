import { getBoardLists } from '../actions';
import getToken from '../utils/getToken';
import currentHost from '../utils/host';
import axios from 'axios';

const fetchBoardLists = (boardId, callback) => dispatch => {
    axios.post(
        `${currentHost}/getBoardLists`, 
        {boardId},
        {headers: {authorization: getToken()}}
    ).then(function (response) {
        const lists = response.data.lists;
        dispatch(getBoardLists(lists));
        callback();
    })
};

export default fetchBoardLists;
