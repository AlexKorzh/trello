import { getBoardLists } from '../actions';
import authorization from '../utils/auth';
import currentHost from '../utils/host';
import axios from 'axios';

const fetchBoardLists = (boardId) => dispatch => {
    axios.post(
        `${currentHost}/getBoardLists`, 
        {boardId},
        {headers: {authorization}}
    ).then(function (response) {
        const lists = response.data.lists;
        dispatch(getBoardLists(lists));
    })
};

export default fetchBoardLists;
