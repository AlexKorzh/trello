import {
    SHOW_MODAL,
    HIDE_MODAL,
    CARD_DETAIL_MODAL
} from '../constants/ActionTypes';

export const showCardDetailModal = payload => {
    return {
        type: SHOW_MODAL,
        modalType: CARD_DETAIL_MODAL,
        modalProps: {
            ...payload
        }
    }
}

export const hideModal = () => ({ type: HIDE_MODAL })

