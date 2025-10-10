import { TaskType } from "@/types/TaskType";
import { baseApi } from "../baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserTasks: builder.query<TaskType[], string>({
      query(userId) {
        return `/tasks/user/${userId}`;
      },
      providesTags: ["Tasks"],
    }),

    getTaskById: builder.query<TaskType, string>({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: ["Tasks"],
    }),

    AddTask: builder.mutation({
      query: (taskData) => ({
        url: `/tasks`,
        method: "POST",
        body: taskData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Tasks"],
    }),

    getGeneratedTaskId: builder.query<number, void>({
      query: () => `tasks/generateId`,
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}/delete`,
        method: "POST",
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: (taskData) => ({
        url: `/tasks/${taskData.id}`,
        method: "POST",
        body: taskData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetUserTasksQuery,
  useLazyGetGeneratedTaskIdQuery,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} = tasksApi;
