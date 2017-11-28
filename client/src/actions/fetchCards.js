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
        debugger;
        const cards = response.data.cards;
        dispatch(getCardLists(cards));
    }, err => console.log(err))
};

export default fetchCards;
