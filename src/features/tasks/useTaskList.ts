import { useGetUserTasksQuery } from "@/services/tasks/tasksApi";
import { setTasks } from "@/slices/TasksSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function useTaskList() {
  const dispatch = useDispatch();
  const loginUser = useSelector((store: RootState) => store.User);
  const {
    data: tasks,
    isSuccess,
    isLoading,
  } = useGetUserTasksQuery(loginUser.userId, {
    skip: !loginUser.userId || loginUser.userId === "",
  });
  useEffect(() => {
    if (tasks) dispatch(setTasks(tasks));
  }, [tasks, isSuccess]);

  return { tasks, isSuccess, isLoading };
}
