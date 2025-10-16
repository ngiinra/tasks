"use client";
import BeatLoading from "../loader/BeatLoading";
import TaskViewInList from "./TaskViewInList";
import { TaskType } from "@/types/TaskType";
import useTaskList from "./useTaskList";

function TasksList() {
  const { tasks, isSuccess, isLoading } = useTaskList();
  return (
    <div className="mt-10 p-1">
      <h2 className="font-bold text-lg border-b-1 p-1">لیست وظایف</h2>
      <div className="flex flex-wrap items-center">
        {isLoading ? (
          <BeatLoading />
        ) : isSuccess && tasks && tasks.length === 0 ? (
          <div key="not-found">وظیفه ای یافت نشد.</div>
        ) : isSuccess && tasks && tasks.length > 0 ? (
          tasks.map((task: TaskType) => (
            <div className="w-full md:w-1/2 p-3 h-53 " key={task.id}>
              <TaskViewInList task={task} key={task.id} />
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
