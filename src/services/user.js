import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../utils/helper";
import { registerEndpoint, authEndpoint, userDataEndpoint, updateTokenEndpoint } from "../utils/endpoints";

const initialState = {
  userData: null,
  errorRegister: null,
  errorAuth: null,
  getDataError: null,
  loadingStatus: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (user) => {
    const response = await request(registerEndpoint, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
    const result = await response.json();
    return result;
  }
);

export const authUser = createAsyncThunk(
  'user/auto',
  async (user) => {
    const response = await request(authEndpoint, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
    const result = await response.json();
    return result;
  }
);

export const getUserData = createAsyncThunk(
  'user/data',
  async () => {
    const response = await request(userDataEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": "Bearer " + localStorage.getItem('accessToken')
      }
    });
    const result = await response.json();
    return result;
  }
);

export const updateUserData = createAsyncThunk(
  'user/data/update',
  async (user) => {
    const response = await request(userDataEndpoint, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": "Bearer " + localStorage.getItem('accessToken')
      }
    });
    const result = await response.json();
    return result;
  }
);

export const updateToken = createAsyncThunk(
  'user/token',
  async () => {
    const response = await request(updateTokenEndpoint, {
      method: "POST",
      body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });
    const result = await response.json();
    return result;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
    setStatusIdle: (state) => {
      state.loadingStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(registerUser.pending, (state) => {
        state.errorRegister = null;
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.errorRegister = null;
        localStorage.setItem('accessToken', action.payload.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      // Вызывается в случае ошибки
      .addCase(registerUser.rejected, (state, action) => {
        state.errorRegister = action.error;
        state.userData = null;
        state.loadingStatus = 'idle';
      })
      // Вызывается прямо перед выполнением запроса
      .addCase(authUser.pending, (state) => {
        state.errorAuth = null;
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(authUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.errorAuth = null;
        localStorage.setItem('accessToken', action.payload.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.loadingStatus = 'idle';
      })
      // Вызывается в случае ошибки
      .addCase(authUser.rejected, (state, action) => {
        state.errorAuth = action.error;
        state.userData = null;
      })
      // Вызывается прямо перед выполнением запроса
      .addCase(getUserData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.getDataError = null;
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.loadingStatus = 'idle';
        state.getDataError = null;
      })
      // Вызывается в случае ошибки
      .addCase(getUserData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.getDataError = action.error;
        state.userData = null;
      })
      //Обновление токена
      // Вызывается, если запрос успешно выполнился
      .addCase(updateToken.fulfilled, (state, action) => {
        localStorage.setItem('accessToken', action.payload.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      // Вызывается в случае ошибки
      .addCase(updateToken.rejected, (state, action) => {
        state.loadingStatus = 'failed update';
        console.log("FAILED UPDATE TOKEN");
      })
      //UPDATE USER DATA
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      // Вызывается в случае ошибки
      .addCase(updateUserData.rejected, (state, action) => {
        console.log("FAILED UPDATE USER");
      });
  }
});

export const { setUserData, clearUserData, setStatusIdle } = userSlice.actions;

export default userSlice.reducer;