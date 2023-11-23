import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { jwtDecode } from "jwt-decode";

export const fetchRegister = createAsyncThunk(
  "/api/auth/fetchRegister",
  async (params) => {
    try {
      const { data } = await axios.post("/api/user/register", params);
      localStorage.setItem("token", data.accessToken);
      const decodedToken = jwtDecode(data.accessToken);
      return decodedToken;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAuth = createAsyncThunk(
  "/api/auth/fetchAuth",
  async (params) => {
    try {
      const { data } = await axios.post("/api/user/login", params);
      localStorage.setItem("token", data.accessToken);
      const decodedToken = jwtDecode(data.accessToken);
      return decodedToken;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "/api/auth/fetchAuthMe",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      try {
        const { data } = await axios.get("/api/user/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("token", data.accessToken);
        const decodedToken = jwtDecode(data.accessToken);
        return decodedToken;
      } catch (error) {
        console.log(error);
      }
    }
    return token;
  }
);

const initialState = {
  data: [],
  user: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
        state.user = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
        state.user = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
        state.user = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { updateUser } = authSlice.actions;
