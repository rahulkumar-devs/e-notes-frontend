import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import persistedReducer from "./rootReducer";
import signinFetchApi from "@/features/api/authApi";

// Configure the store with the root reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
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
