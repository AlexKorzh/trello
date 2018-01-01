import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import {
    CREATE_CARD,
    GET_CARDS,
    UPDATE_CARD_TITLE,
    GET_CARD_DETAILS
} from '../constants/ActionTypes';

import { startFetching, endFetching } from './fetching';

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

export const updateCardTitle = payload => {
    return {
        type: UPDATE_CARD_TITLE,
        payload
    }
}

export const getCardDetails = payload => {
    return {
        type: GET_CARD_DETAILS,
        payload
    }
}

export const createCardsOnDropMiddleware = cards => {
    return dispatch => {
        dispatch(startFetching());

        const isSingle = cards.length === 1;
        const card = isSingle && cards[0];

        isSingle ? dispatch(createCard(card)) : null;

        axios.post(
            `${currentHost}/createCard`,
            {title: card.title, listId: card.list, boardId: card.board},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(createCard(response.data.card));
        });
    }
}

export const createCardMiddleware = payload => {
    const { title, list, board } = payload;
    debugger;
    return dispatch => {
        axios.post(
            `${currentHost}/createCard`,
            {title, list, board},
            {headers: { authorization: token.get() }}
        ).then(response => {
            debugger;
            dispatch(createCard(response.data.card));
        });
    }
}

export const updateCardTitleMiddleware = (cardId, title) => {
    return dispatch => {
        axios.post(
            `${currentHost}/updateCardTitle`,
            {cardId, title},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(updateCardTitle(response.data.card));
        });
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
