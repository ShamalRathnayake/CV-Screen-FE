import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi/authApi";
import authReducer from "./auth/authSlice";
import settingsReducer from "./settings/settingsSlice";
import { userApi } from "../services/userApi/userApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
