import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer, { logOut } from "@/features/auth/authReducer";
import signinFetchApi from "@/features/api/authApi";
import booksReducer from "@/features/dashboard/booksReducer";

// Combine the reducers
const appReducer = combineReducers({
  auth: authReducer,
  books: booksReducer, // This reducer will not be persisted
  [signinFetchApi.reducerPath]: signinFetchApi.reducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === logOut.type) {
    storage.removeItem('persist:root');
    state = undefined;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['auth'], // Only persist the auth reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
