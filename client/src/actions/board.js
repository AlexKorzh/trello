import { getUserBoards } from '../actions';
import authorization from '../utils/auth';
import currentHost from '../utils/host';
import axios from 'axios';

<<<<<<< HEAD
const fetchBoards = () => {
    return dispatch => {
        axios.post(
            `${currentHost}/getAllBoards`,
            null,
            {headers: {authorization}}
        ).then(response => {
            console.log('F E T C H || RESPONSE', response);
        });
    }
}
=======
const fetchBoards = () => dispatch => {
    axios.post(
        `${currentHost}/getAllBoards`, null,
        {headers: {authorization}}
    ).then(function (response) {
        const boards = response.data.boards;

        dispatch(getUserBoards(boards));
    })
};
>>>>>>> d9dfa0ca0789b0b29c2d85270544b5d185473a49

export default fetchBoards;
