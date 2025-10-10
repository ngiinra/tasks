import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/services/tasks/tasksApi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useGetListTag from "./useGetListTag";
import { useEffect, useState } from "react";
import { TaskType } from "@/types/TaskType";
import { RootState } from "../../../store";
import { updateTask } from "@/slices/TasksSlice";
import toast from "react-hot-toast";

export default function useTaskView(taskId: string) {
  const { data, isLoading, isError } = useGetTaskByIdQuery(taskId);
  const dispatch = useDispatch();
  const router = useRouter();
  const loginUser = useSelector((store: RootState) => store.User);
  const { lists, listsLoading, tags, tagsLoading } = useGetListTag(loginUser);
  const [task, setTask] = useState<TaskType>({
    id: Number(taskId),
    deleted: 0,
    description: "",
    doneDate: "",
    list: "",
    state: "",
    tags: "",
    title: "",
    todoDate: "",
    userId: "",
    estimateHour: "",
    remainingHour: "",
    completedHour: "",
  });
  const [defaultSelectedTags, setDefaultSelectedTags] = useState<string[]>([]);
  useEffect(() => {
    if (data && tags) {
      setTask(data);
      setDefaultSelectedTags(
        data.tags.split(",").map((dt) => {
          const tag = tags.find((tag) => tag.text === dt);
          return tag ? tag.value : "";
        })
      );
    }
  }, [data, tags]);
  useEffect(() => {
    if (loginUser) setTask((pre) => ({ ...pre, userId: loginUser.userId }));
  }, [loginUser]);

  const [useUpdate, { isLoading: isUpdating }] = useUpdateTaskMutation();

  async function handleUpdateTask() {
    if (!!task.title.trim()) {
      try {
        await useUpdate(task).unwrap();
        dispatch(updateTask({ id: task.id, updates: task }));
        toast.success("تسک اپدیت شد.");
        router.push("/dashboard/tasks");
      } catch {
        toast.error("اپدیت تسک به خطا خورد");
      }
    }
  }

  return {
    data,
    isLoading,
    isError,
    lists,
    listsLoading,
    tags,
    tagsLoading,
    task,
    setTask,
    defaultSelectedTags,
    isUpdating,
    handleUpdateTask,
  };
}
