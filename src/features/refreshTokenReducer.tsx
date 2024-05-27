import axios from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
// import { setUser } from "./auth/authReducer";

// Thunk for refreshing the token
export const refreshTokenAsync = createAsyncThunk(
  "auth/refreshToken",
  async (_, {  rejectWithValue }) => {
    try {
      const response = await axios.post("/refresh-token",{withCredentials:true});
      if (![200, 201].includes(response.status)) {
        console.error(`Unexpected response status: ${response.status}`);
        return rejectWithValue("Unexpected response status");
      }
      //   dispatch(setUser())
      console.log("response-refreshToken", response);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (!error.response) {
          console.error("No server response");
          return rejectWithValue("No server response");
        } else if (error.response.status === 403) {
          console.error("Forbidden");
          return rejectWithValue("Forbidden");
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

// Slice for handling refresh token state
const refreshTokenSlice = createSlice({
  name: "refreshToken",
  initialState: {
    token: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshTokenAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(refreshTokenAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default refreshTokenSlice.reducer;
