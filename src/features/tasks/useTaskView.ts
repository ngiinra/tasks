import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/services/tasks/tasksApi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import useGetListTag from "./useGetListTag";
import { useEffect, useState } from "react";
import { TaskType } from "@/types/TaskType";
import { RootState } from "../../../store";
import { updateTask } from "@/slices/TasksSlice";
import toast from "react-hot-toast";
import DateHelper from "@/utility/DateHelper";

export default function useTaskView(taskId: string) {
  const dateHelper = new DateHelper();
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
      setTask({
        id: Number(taskId),
        deleted: data.deleted,
        description: data.description || "",
        doneDate: data.doneDate || "",
        list: data.list || "",
        state: data.state,
        tags: data.tags || "",
        title: data.title,
        todoDate: data.todoDate || "",
        userId: data.userId,
        estimateHour: data.estimateHour || "",
        remainingHour: data.remainingHour || "",
        completedHour: data.completedHour || "",
      });
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
      if (task.state === "DONE") {
        task.doneDate = dateHelper.getPersianDateOf(0);
      }
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
    router,
  };
}
