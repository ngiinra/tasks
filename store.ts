// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "@/slices/UserSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { baseApi } from "@/services/baseApi";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
