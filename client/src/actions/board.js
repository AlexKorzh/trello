import { getUserBoards } from '../actions';
import getToken from '../utils/getToken';
import currentHost from '../utils/host';
import axios from 'axios';

const fetchBoards = () => dispatch => {
    let authorization = getToken();

    axios.post(
        `${currentHost}/getAllBoards`, null,
        {headers: {authorization}}
    ).then(function (response) {
        const boards = response.data.boards;

        dispatch(getUserBoards(boards));
    })
};

export default fetchBoards;
