import { 
    SHOW_MODAL, 
    HIDE_MODAL, 
    HIDE_MODAL_MANUAL 
} from '../constants/ActionTypes';

const initialState = {
    modalType: null,
    modalProps: {
        type: 'HIDE_MODAL'
    }
}
  
const modal = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            const { modalType, modalProps } = action;

            return {
                modalType,
                modalProps
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
