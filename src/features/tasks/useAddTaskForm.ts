import { TaskType } from "@/types/TaskType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  useAddTaskMutation,
  useLazyGetGeneratedTaskIdQuery,
} from "@/services/tasks/tasksApi";
import toast from "react-hot-toast";
import { addTask } from "@/slices/TasksSlice";
import { useEffect, useState } from "react";

export default function useAddTaskForm() {
  const initialTask = {
    title: "",
    description: "",
    deleted: 0,
    state: "NEW",
    list: "",
    tags: "",
    doneDate: "",
    todoDate: "",
    userId: "",
    id: "",
  };
  const dispatch = useDispatch();
  const [addTaskMutaion, { isLoading }] = useAddTaskMutation();
  const [getGeneratedTaskId] = useLazyGetGeneratedTaskIdQuery();
  const [clicked, setClicked] = useState<boolean>(false);
  const loginUser = useSelector((store: RootState) => store.User);
  const [task, setTask] = useState<TaskType>(initialTask);

  useEffect(() => {
    setTask((pre) => ({ ...pre, userId: loginUser.userId.trim() }));
  }, [loginUser]);

  function handleShowForm() {
    setClicked((pre) => !pre);
  }

  async function handleAddTask() {
    if (task.title.trim() && task.description.trim()) {
      let generatedId: string | null = null;
      const maxTries = 3;
      let tries = 0;

      while (tries < maxTries) {
        try {
          generatedId = await getGeneratedTaskId().unwrap();
          break;
        } catch (err) {
          console.error("خطا در دریافت ID:", err);
          tries++;
        }
      }

      if (!generatedId) {
        toast.error(
          "مشکلی در افزودن تسک به وجود آمده است. لطفا با مدیر سرور ارتباط بگیرید."
        );
        return;
      }

      const newTask = { ...task, id: generatedId };
      try {
        await addTaskMutaion(newTask).unwrap();
        toast.success("تسک با موفقیت اضافه شد.");
        dispatch(addTask(newTask));
        setTask(initialTask);
        setClicked(false);
      } catch (err) {
        toast.error("افزودن تسک با خطا مواجه شد.");
      }
    }
  }

  return { isLoading, clicked, task, setTask, handleShowForm, handleAddTask };
}
