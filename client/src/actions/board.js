import authorization from '../utils/auth';
import currentHost from '../utils/host';
import axios from 'axios';

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

export default fetchBoards;
