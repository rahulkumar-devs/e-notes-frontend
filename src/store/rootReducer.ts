import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import authReducer, { logOut } from "@/features/auth/authReducer";
import signinFetchApi from "@/features/api/authApi";

const appReducer = combineReducers({
  auth: authReducer,
  [signinFetchApi.reducerPath]: signinFetchApi.reducer,
  // Add other reducers here
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
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
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
