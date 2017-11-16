import { getUserBoards } from '../actions';
import authorization from '../utils/auth';
import currentHost from '../utils/host';
import axios from 'axios';

const fetchBoards = () => dispatch => {
    axios.post(
        `${currentHost}/getAllBoards`, null,
        {headers: {authorization}}
    ).then(function (response) {
        const boards = response.data.boards;

        dispatch(getUserBoards(boards));
    })
};

export default fetchBoards;
