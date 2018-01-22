import { 
    SHOW_MODAL, 
    HIDE_MODAL, 
    HIDE_MODAL_MANUAL,
    UPDATE_MODAL_TITLE 
} from '../actionTypes';

const initialState = {
    modalType: null,
    modalProps: {
        type: 'HIDE_MODAL'
    }
}
  
const modal = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case HIDE_MODAL:
            return initialState;
        case HIDE_MODAL_MANUAL:
            return { ...initialState,  modalProps: { type: 'HIDE_MODAL_MANUAL' } };
        default:
            return state;
    }
}

export default modal;
