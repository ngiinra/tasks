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
        doneDate:
          new Date(data.doneDate).toLocaleDateString("fa-IR-u-nu-latn", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }) || "",
        list: data.list || "",
        state: data.state,
        tags: data.tags || "",
        title: data.title,
        todoDate:
          new Date(data.todoDate).toLocaleDateString("fa-IR-u-nu-latn", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }) || "",
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
      const editedTask = task;
      if (task.todoDate) {
        const todoDateGDate = dateHelper.convertJalaliToGregorian(
          Number(task.todoDate.split("/")[0]),
          Number(task.todoDate.split("/")[1]),
          Number(task.todoDate.split("/")[2])
        );
        console.log(todoDateGDate);
        editedTask.todoDate =
          todoDateGDate[0] + "-" + todoDateGDate[1] + "-" + todoDateGDate[2];
      }
      console.log(editedTask.todoDate);
      if (task.state === "DONE") {
        editedTask.doneDate = new Date().toLocaleDateString("us");
        console.log(editedTask.doneDate);
      }
      try {
        await useUpdate(editedTask).unwrap();
        dispatch(updateTask({ id: task.id, updates: editedTask }));
        toast.success("تسک اپدیت شد.");
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
