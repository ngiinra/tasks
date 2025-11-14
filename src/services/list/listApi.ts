import { DefinitionType } from "@/types/definitionsType";
import { baseApi } from "../baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addList: builder.mutation({
      query: (listData) => ({
        url: `/users/${listData.userId}/list`,
        method: "POST",
        body: listData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Lists"],
    }),
    updateList: builder.mutation({
      query: (listData) => ({
        url: `/users/${listData.userId}/tags/${listData.id}`,
        method: "POST",
        body: listData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Lists"],
    }),
    getList: builder.query<DefinitionType[], string>({
      query: (userId) => ({
        url: `/users/${userId}/list`,
      }),
      providesTags: ["Lists"],
    }),
  }),
});

export const { useAddListMutation, useGetListQuery, useUpdateListMutation } =
  tasksApi;
