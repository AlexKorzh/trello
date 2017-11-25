import { getCardLists } from '../actions';
import getToken from '../utils/getToken';
import currentHost from '../utils/host';
import axios from 'axios';

const fetchCards = (listId) => dispatch => {
    axios.post(
        `${currentHost}/getAllCards`, 
        {listId},
        {headers: {authorization: getToken()}}
    ).then(function (response) {
        const cards = response.data.cards;
        dispatch(getCardLists(cards));
    })
};

export default fetchCards;
