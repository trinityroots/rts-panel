import { createStore } from 'redux';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {  key: 'root',  storage }

const persistedReducer = persistReducer(persistConfig, reducer)

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(persistedReducer);
const persister = persistStore(store);

store.subscribe(() =>
    console.log('State after dispatch: ', store.getState())
);

export { store, persister };
