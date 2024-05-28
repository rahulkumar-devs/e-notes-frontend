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
      const { user, accessToken } = action.payload;
      // console.log(user, accessToken);
      state.user = user;
      state.token = accessToken;
      state.roles=user.role;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
    },
  },

});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;


