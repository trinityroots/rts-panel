// action - state management
import * as actionTypes from './actionsToken';

export const initialState = {
    tokenContract: null,
};

// ==============================|| ACCOUNT REDUCER ||============================== //

const tokenContractReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN_CONTRACT:
            return {
                ...state,
                tokenContract: action.tokenContract
            };
        default:
            return state;
    }
};

export default tokenContractReducer;
