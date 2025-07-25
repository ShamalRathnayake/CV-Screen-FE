import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import settingsReducer from "./settings/settingsSlice";
import predictionReducr from "./predictions/predictionsSlice";
import { authApi } from "../services/authApi/authApi";
import { userApi } from "../services/userApi/userApi";
import { predictionApi } from "../services/predictionApi/predictionApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    predictions: predictionReducr,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [predictionApi.reducerPath]: predictionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      predictionApi.middleware
    ),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
