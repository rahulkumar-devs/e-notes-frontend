import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: null;
  roles: ("admin" | "user" | "member")[];
}

// Initialize the state with proper types
const initialState: AuthState = {
  user: null,
  token: null,
  roles: [],
};

const authSlice = createSlice({
  name: "auth-user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("auth-user/clearState", () => initialState);
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// Action to clear the persisted state
export const clearState = () => ({ type: "auth-user/clearState" });
