import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "UserSetting",
    "User",
    "Users",
    "Fonts",
    "Themes",
    "Languages",
    "Tasks",
    "Lists",
  ], // هر چیزی که نیاز داری
  endpoints: () => ({}), // اینجا خالیه چون قراره از فایل‌های دیگه inject بشه
});
