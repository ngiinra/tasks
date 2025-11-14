import { DefinitionType } from "@/types/definitionsType";
import { baseApi } from "../baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTag: builder.mutation({
      query: (tagData) => ({
        url: `/users/${tagData.userId}/tags`,
        method: "POST",
        body: tagData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Tags"],
    }),
    updateTag: builder.mutation({
      query: (tagData) => ({
        url: `/users/${tagData.userId}/tags/${tagData.id}`,
        method: "POST",
        body: tagData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Tags"],
    }),
    getTags: builder.query<DefinitionType[], string>({
      query: (userId) => ({
        url: `/users/${userId}/tags`,
      }),
      providesTags: ["Tags"],
    }),
  }),
});

export const { useAddTagMutation, useGetTagsQuery, useUpdateTagMutation } =
  tasksApi;
