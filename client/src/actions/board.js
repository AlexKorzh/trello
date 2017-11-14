import authorization from '../utils/auth';
import currentHost from '../utils/host';
import axios from 'axios';

const fetchBoards = callback => {
    console.log('fetch');
    return dispatch => {
        axios.post(
            `${currentHost}/getAllBoards`,
            {headers: {authorization}}
        ).then(function (response) {
            console.log('F E T C H || RESPONSE', response);
        })
    }
};

export default fetchBoards;
