// action - state management
import * as actionTypes from './actionsAccount';

export const initialState = {
    accountAddress: null,
    accountButtonText: 'Sign In'
};

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACCOUNT_ADDRESS:
            return {
                ...state,
                accountAddress: action.accountAddress
            };
        case actionTypes.SET_ACCOUNT_BUTTON_TEXT:
            return {
                ...state,
                accountButtonText: action.buttonText
            }
        default:
            return state;
    }
};

export default accountReducer;
