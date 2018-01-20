import {
    CREATE_CARD,
    GET_CARDS,
    UPDATE_CARD_TITLE,
    GET_CARD_DETAILS,
    DELETE_CARD,
    START_FILE_UPLOADING,
    END_FILE_UPLOADING,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from '../ActionTypes';

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

export const deleteCard = payload => {
    return {
        type: DELETE_CARD,
        payload
    }
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload
    }
}

export const updateComment = payload => {
    return {
        type: UPDATE_COMMENT,
        payload
    }
}

export const deleteComment = payload => {
    return {
        type: DELETE_COMMENT,
        payload
    }
}
