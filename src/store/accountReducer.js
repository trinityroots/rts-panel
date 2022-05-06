// action - state management
import * as actionTypes from './actionsAccount';

export const initialState = {
    accountAddress: null,
    accountBalance: '-'
};

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACCOUNT_ADDRESS:
            return {
                ...state,
                accountAddress: action.accountAddress
            };
        case actionTypes.SET_ACCOUNT_BALANCE:
            return {
                ...state,
                accountBalance: action.accountBalance
            }
        default:
            return state;
    }
};

export default accountReducer;
