import axios from "@/config/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

// Define a type for the values expected by the thunk
interface SignInValues {
  email: string;
  password: string;
}

// First, create the thunk
export const fetchSigninData = createAsyncThunk(
  'users/signin',
  async (values: SignInValues, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post("/signin", values);

      if (![200, 201].includes(res.status)) {
        console.error(`Unexpected response status: ${res.status}`);
        return rejectWithValue('Unexpected response status');
      }

      const { user, accessToken, role } = res.data;
      const recent = { user, accessToken, role };

      dispatch(setUser(recent));
      return recent;
    } catch (error) {
      if (isAxiosError(error)) {
        if (!error.response) {
          console.error("No server response");
          return rejectWithValue("No server response");
        } else if (error.response.status === 400) {
          console.error("Missing password and email");
          return rejectWithValue("Missing password and email");
        } else if (error.response.status === 401) {
          console.error("Unauthorized");
          return rejectWithValue("Unauthorized");
        } else {
          console.error("Signin failed");
          return rejectWithValue("Signin failed");
        }
      } else {
        console.error("An unexpected error occurred", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export interface User {
  user: any;
  accessToken: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  message: string;
  authenticated: boolean;
  userRoles:null;
}

// Initialize the state with proper types
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("authInfo") || "null"),
  isLoading: false,
  message: "",
  authenticated: !!localStorage.getItem("authInfo"),
  userRoles:null
};

const authSlice = createSlice({
  name: "auth-user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.authenticated = true;
      state.userRoles=action.payload.user?.role
      localStorage.setItem("authInfo", JSON.stringify(action.payload));
    },
    setMsg: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.authenticated = false;
      localStorage.removeItem("authInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSigninData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSigninData.fulfilled, (state) => {
        state.isLoading = false;
        
      })
      .addCase(fetchSigninData.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload as string;
      });
  },
});

export const { setUser, setMsg, clearAuth } = authSlice.actions;
export default authSlice.reducer;
