// action - state management
import * as actionTypes from './actionsEvent';

export const initialState = {
    transfer: []
};

// ==============================|| EVENT REDUCER ||============================== //

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEW_TRANSFER:
            return {
                ...state,
                transfer: state.transfer.concat(action.newTransfer)
            };
        default:
            return state;
    }
};

export default eventReducer;
