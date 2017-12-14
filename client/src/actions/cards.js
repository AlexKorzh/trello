import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import {
    CREATE_CARD,
    GET_CARDS,
    GET_CARD_DETAILS
} from '../constants/ActionTypes';

export const createCard = payload => {
    return {
        type: CREATE_CARD,
        payload
    }
}

export const getCards = payload => {
    return {
        type: GET_CARDS,
        payload
    }
}

export const getCardDetails = payload => {
    return {
        type: GET_CARD_DETAILS,
        payload
    }
}

export const fetchCards = (lists) => dispatch => {
    axios.post(
        `${currentHost}/getAllCards`, 
        {lists},
        {headers: {authorization: token.get()}}
    ).then(function (response) {
        const cards = response.data.cards;
        dispatch(getCards(cards));
    }).catch(function (error) {
        console.warn(error);
    });
}

export const createCardMiddleware = (title, listId, boardId) => {
    return dispatch => {
        axios.post(
            `${currentHost}/createCard`,
            {title, listId, boardId},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(createCard(response.data.card));
        });
    }
}

export const getCardDetailsMiddleware = (id) => {
    return dispatch => {
        axios.get(
            `${currentHost}/cardDetails`,
            {
                headers: { authorization: token.get() },
                params: { id }
            }
        ).then(response => {
            console.log('Response: ', response);
        });
    }
}
