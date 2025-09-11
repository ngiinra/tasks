"use client";
import { UserType, SettingType } from "@/types/UserTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    userId: "",
    theme: "yashmi",
    font: "yekan",
    language: "persian",
    fname: "",
    lname: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  } as UserType,
  reducers: {
    setUserId: (state, action: PayloadAction<Partial<string>>) => {
      state.userId = action.payload;
    },
    changeUserPassword: (state, action: PayloadAction<Partial<string>>) => {
      state.password = action.payload;
    },
    changeSetting: (state, action: PayloadAction<Partial<SettingType>>) => {
      if (
        action.payload.font &&
        action.payload.language &&
        action.payload.theme
      ) {
        state.font = action.payload.font;
        state.language = action.payload.language;
        state.theme = action.payload.theme;
      }
    },
    setUser: (state, action: PayloadAction<Partial<UserType>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserId, changeSetting, changeUserPassword, setUser } =
  UserSlice.actions;
export default UserSlice.reducer;
