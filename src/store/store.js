import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import dataSlice from './dataSlice';


// Persist Configurations for Reducers
const dataPersistConfig = {
    key: 'data',
    storage,
    whitelist: ['allTickets', 'allUser', 'group', 'order','filteredData', 'user'], // Specify keys to persist
};


// Persist Reducers
const persistedDataReducer = persistReducer(dataPersistConfig, dataSlice);


// Configure Store
const store = configureStore({
    reducer: {
        data: persistedDataReducer,
      
    },
});

export const persistor = persistStore(store);

export default store;