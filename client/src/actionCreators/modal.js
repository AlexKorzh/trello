import {
    SHOW_MODAL,
    HIDE_MODAL,
    HIDE_MODAL_MANUAL,
    CARD_DETAIL_MODAL,
    UPDATE_MODAL_TITLE
} from '../ActionTypes';

export const showCardDetailModal = payload => {
    return {
        type: SHOW_MODAL,
        modalType: CARD_DETAIL_MODAL,
        modalProps: payload
    }
}

export const hideModal = () => ({ type: HIDE_MODAL })

export const hideModalManual = () => ({ type: HIDE_MODAL_MANUAL })

