import { TaskType } from "@/types/TaskType";
import { baseApi } from "../baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserTasks: builder.query<TaskType[], string>({
      query(userId) {
        return `/tasks/user/${userId}`;
      },
      providesTags: (_, __, userId) => [{ type: "Tasks", id: userId }],
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
    }),

    getGeneratedTaskId: builder.query<string, void>({
      query: () => `tasks/generateId`,
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetUserTasksQuery,
  useLazyGetGeneratedTaskIdQuery,
} = tasksApi;
