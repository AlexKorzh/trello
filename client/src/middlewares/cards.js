import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';

import {
    getCards,
    createCard,
    updateCardTitle,
    getCardDetails,
    deleteCard,
    addComment,
    updateComment,
    deleteComment,
    startFileUploading,
    endFileUploading
} from '../actionCreators/cards';

import { hideModal } from '../actionCreators/modal';
import { startFetching, endFetching } from '../actionCreators/fetching';

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

export const deleteCardMiddleware = id => {
    return dispatch => {
        axios.post(
            `${currentHost}/deleteCard`,
            {id},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(hideModal());
            dispatch(deleteCard(response.data.card));
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
            console.log('CARD DETAILS --->', response);
        });
    }
}

//Comments
export const addCommentMiddleware = comment => {
    return dispatch => {
        axios.post(
            `${currentHost}/addComment`,
            {id: comment.cardId, text: comment.text, date: comment.date},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(addComment(response.data.card));
        });
    }
}

export const updateCommentMiddleware = comment => {
    return dispatch => {
        axios.post(
            `${currentHost}/updateComment`,
            {
                id: comment.cardId,
                commentId: comment.commentId, 
                text: comment.text, 
                date: comment.date
            },
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(updateComment(response.data.card));
        });
    }
}

export const deleteCommentMiddleware = comment => {
    return dispatch => {
        axios.post(
            `${currentHost}/deleteComment`,
            {
                id: comment.cardId,
                commentId: comment.commentId 
            },
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(deleteComment(response.data.card));
        });
    }
}
