import { createStore } from 'redux';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer);
const persister = 'Free';

store.subscribe(() =>
    console.log('State after dispatch: ', store.getState())
);

export { store, persister };
