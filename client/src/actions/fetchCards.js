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
        console.log('R E S P O N S E ---------->', response.data.cards);
        const cards = response.data.cards;
        dispatch(getCardLists(cards));
    }).catch(function (error) {
        console.log('ERROR -----> ',error);
    });
};

export default fetchCards;
