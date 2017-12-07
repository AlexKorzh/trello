import { getBoards } from '../actions';
import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';


const getBoardsMiddleware = () => dispatch => {
    let authorization = token.get();

    axios.post(
        `${currentHost}/getAllBoards`, null,
        {headers: {authorization}}
    ).then(function (response) {
        const boards = response.data.boards;

        dispatch(getBoards(boards));
    })
};

export default getBoardsMiddleware;
