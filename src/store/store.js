import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";  // Use sessionStorage for persistence
import dataReducer from "./dataSlice";  // Import our data slice

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['allTickets', 'allUser', 'selectedData'], // Specify which slices to persist
};

// Persist reducer
const persistedReducer = persistReducer(persistConfig, dataReducer);
// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
  });


// Create a persistor to sync persisted state
const persistor = persistStore(store);

// Export store and persistor for use in the app
export { store, persistor };
