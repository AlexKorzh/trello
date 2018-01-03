import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import {
    CREATE_CARD,
    GET_CARDS,
    UPDATE_CARD_TITLE,
    GET_CARD_DETAILS,
    START_FILE_UPLOADING,
    END_FILE_UPLOADING
} from '../constants/ActionTypes';

import { startFetching, endFetching } from './fetching';

export const createCard = payload => {
    return {
        type: CREATE_CARD,
        payload
    }
}

export const startFileUploading = payload => {
    return {
        type: START_FILE_UPLOADING,
        payload
    }
}

export const endFileUploading = payload => {
    return {
        type: END_FILE_UPLOADING,
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
    const { title, list, board, file } = payload;
    const authorization = token.get();
    const url = `${currentHost}/createCard`;

    const strategies = {
        'onDrop': dispatch => {
            const data = { title, list, board };
            const formData = new FormData();

            formData.append('board', board);
            formData.append('title', title);
            formData.append('list', list);
            formData.append('file', file, file.name);

            dispatch(startFileUploading(data));

            axios.post(
                url,
                formData,
                {headers: {
                    authorization,
                    'content-type': 'multipart/form-data'
                }}
            ).then(response => {
                const { card } = response.data;

                dispatch(endFileUploading(card));
            });
        },
        'default': dispatch => {
            axios.post(
                url,
                {title, list, board},
                {headers: { authorization }}
            ).then(response => {
                const { card } = response.data;

                dispatch(createCard(card));
            });
        }
    }

    const strategy = dispatch => {
        return file ?
            strategies['onDrop'](dispatch) : strategies['default'](dispatch);
    }

    return dispatch => strategy(dispatch);
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
