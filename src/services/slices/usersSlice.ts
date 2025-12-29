import { loginUserApi, registerUserApi, getUserApi, TRegisterData, logoutApi } from "@api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { RootState } from "../store";
import { deleteCookie, setCookie } from "../../utils/cookie";


export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>, {rejectWithValue}) => {
    const data = await loginUserApi({ email, password })
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  } 
);

export const register = createAsyncThunk('auth/register', async (data: TRegisterData) => registerUserApi(data));

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', async (_, { rejectWithValue }) => {
  try {
    const data = await getUserApi();
    if (!data?.success) return rejectWithValue(data);
    return data.user;
  } catch (err) {
    return rejectWithValue(err);
  }
});


export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);


export type TUserState = {
  isAuthChecked: boolean,
  isAuthenticated: boolean,
  data: TUser | null,
  loginUserError: string | null,
  loginUserRequest: boolean
}


const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
};



export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: state => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.loginUserRequest = false;
      state.loginUserError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message!;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.data = null;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(register.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message!;
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
  }
});



export const { userLogout, authCheck } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const getUserSelector = (state: RootState) => state.user;
export const getUserDataSelector = (state: RootState) => state.user.data;
export const getUserAuthSelector = (state: RootState) => state.user.isAuthenticated;
export const getUserAuthCheckedSelector = (state: RootState) => state.user.isAuthChecked;
export const getLoginUserErrorSelector = (state: RootState) => state.user.loginUserError;
