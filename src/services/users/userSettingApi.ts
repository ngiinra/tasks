import { SettingType } from "@/types/UserTypes";
import { baseApi } from "../baseApi";

export const userSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get
    getUserSetting: builder.query<SettingType, string>({
      query: (userId) => `users/${userId}/setting`,
      providesTags: (result, error, userId) => [
        { type: "UserSetting", userId: userId },
      ],
    }),

    // update - patch
    updateUserSetting: builder.mutation({
      query: ({ userId, setting }) => ({
        url: `users/${userId}/setting`,
        method: "PATCH",
        body: setting,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "UserSetting", userId: userId },
      ],
    }),
  }),
});

export const { useGetUserSettingQuery, useUpdateUserSettingMutation } =
  userSettingApi;
