import { LoginType, UserType } from "@/types/UserTypes";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get by id
    getUserData: builder.query<UserType, string>({
      query: (userId) => `users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),

    // update all - put
    updateUserData: builder.mutation({
      query: ({ userId, data }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),

    // update password
    updateUserPass: builder.mutation({
      query: ({ userId, data }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),

    getLoginUser: builder.mutation<UserType, LoginType>({
      query: (credentials) => ({
        url: `users/login`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: (result, error, user) => [
        {
          type: "User",
          username: user.username,
          password: user.password,
        },
      ],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useUpdateUserPassMutation,
  useGetLoginUserMutation,
} = userApi;
