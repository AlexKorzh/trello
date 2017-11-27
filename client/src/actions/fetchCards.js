import { getCardLists } from '../actions';
import getToken from '../utils/getToken';
import currentHost from '../utils/host';
import axios from 'axios';

const fetchCards = (lists) => dispatch => {
    axios.post(
        `${currentHost}/getAllCards`, 
        {lists},
        {headers: {authorization: getToken()}}
    ).then(function (response) {
        const cards = response.data.cards;
        dispatch(getCardLists(cards));
    })
};

export default fetchCards;
