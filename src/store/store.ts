import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query/react"; // Import setupListeners function
import  signinFetchApi  from "@/features/api/authApi"; // Import your RTK Query API slice

import authReducer from "@/features/auth/authReducer";
import refreshTokenReducer from "@/features/refreshTokenReducer";

// Combine persisted reducers
const persistedReducers = combineReducers({
  auth: authReducer, 
});

// Combine non-persisted reducers
const nonPersistedReducers = combineReducers({
  refreshToken: refreshTokenReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, persistedReducers);

// Combine persisted and non-persisted reducers into a root reducer
const rootReducer = combineReducers({
  persisted: persistedReducer,
  nonPersisted: nonPersistedReducers,
  [signinFetchApi.reducerPath]: signinFetchApi.reducer, // Add the RTK Query API reducer
});

// Middleware configuration


// Configure the store with the root reducer and middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(signinFetchApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Add listeners for RTK Query
setupListeners(store.dispatch);

// Create a persistor linked to the store
export const persistor = persistStore(store);

// Define types for the state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
