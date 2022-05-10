// action - state management
import * as actionTypes from './actionsEvent';

export const initialState = {
    transfer: [],
    notification: []
};

// ==============================|| EVENT REDUCER ||============================== //

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEW_TRANSFER:
            return {
                ...state,
                transfer: state.transfer.concat(action.newTransfer)
            };
        case actionTypes.CLEAR_ALL_TRANSFER:
            return {
                ...state,
                transfer: action.emptyTransfer
            };
        case actionTypes.SET_NEW_NOTIFICATION:
            return {
                ...state,
                notification: state.notification.concat(action.newTransfer)
            };
        case actionTypes.CLEAR_ALL_NOTIFICATION:
            return {
                ...state,
                notification: action.emptyTransfer
            };
        default:
            return state;
    }
};

export default eventReducer;
