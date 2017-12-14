import { SHOW_MODAL, HIDE_MODAL } from '../constants/ActionTypes';

const initialState = {
    modalType: null,
    modalProps: {}
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
        default:
            return state;
    }
}

export default modal;
