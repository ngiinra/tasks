"use client";
import { useGetUserTasksQuery } from "@/services/tasks/tasksApi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import BeatLoading from "../loader/BeatLoading";
import TaskViewInList from "./TaskViewInList";
import { setTasks } from "@/slices/TasksSlice";
import { TaskType } from "@/types/TaskType";

function TasksList() {
  const dispatch = useDispatch();
  const loginUser = useSelector((store: RootState) => store.User);
  console.log(loginUser);
  const {
    data: tasks,
    isSuccess,
    isLoading,
  } = useGetUserTasksQuery(loginUser.userId.trim(), {
    skip: !loginUser.userId || loginUser.userId.trim() === "",
  });
  useEffect(() => {
    if (tasks) dispatch(setTasks(tasks));
  }, [tasks, isSuccess]);
  return (
    <div className="mt-10 p-1">
      <h2 className="font-bold text-lg border-b-1 p-1">لیست وظایف</h2>
      <div className="flex flex-wrap items-center">
        {isLoading ? (
          <BeatLoading />
        ) : isSuccess && tasks && tasks.length === 0 ? (
          <div>وظیفه ای یافت نشد.</div>
        ) : isSuccess && tasks && tasks.length > 0 ? (
          tasks.map((task: TaskType) => (
            <div className="w-1/2 p-3">
              <TaskViewInList title={task.title} key={task.id} />
            </div>
          ))
        ) : (
          !isSuccess && <div>در بارگذاری تسک ها خطایی رخ داده است</div>
        )}
      </div>
    </div>
  );
}

export default TasksList;
