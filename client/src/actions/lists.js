import { getBoardLists } from '../actions';
import getToken from '../utils/getToken';
import currentHost from '../utils/host';
import axios from 'axios';
import fetchCards from './fetchCards'

const fetchBoardLists = (boardId) => dispatch => {
    axios.post(
        `${currentHost}/getBoardLists`, 
        {boardId},
        {headers: {authorization: getToken()}}
    ).then(function (response) {
        // debugger;
        const lists = response.data.lists;
        dispatch(getBoardLists(lists));

        let newlist = lists.map((list) => list._id);
        dispatch(fetchCards(newlist));
    })
};

export default fetchBoardLists;
