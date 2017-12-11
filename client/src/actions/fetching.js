import {
    START_FETCHING,
    END_FETCHING
} from '../constants/ActionTypes';

export const startFetching = () => {
    return {
        type: START_FETCHING
    }
}

export const endFetching = () => {
    return {
        type: END_FETCHING
    }
}
