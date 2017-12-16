import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import {
    CREATE_CARD,
    GET_CARDS,
<<<<<<< HEAD
    UPDATE_CARD_TITLE
=======
    GET_CARD_DETAILS
>>>>>>> f7056d595bea0bc907eeba6062c980a78d4c8ced
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

<<<<<<< HEAD
export const updateCardTitle = payload => {
    return {
        type: UPDATE_CARD_TITLE,
        payload
    }
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
=======
export const getCardDetails = payload => {
    return {
        type: GET_CARD_DETAILS,
        payload
>>>>>>> f7056d595bea0bc907eeba6062c980a78d4c8ced
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
