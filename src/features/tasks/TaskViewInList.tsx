import React, { useState } from "react";
import { PiTrashSimple } from "react-icons/pi";
import Toolbar from "../Toolbar";
import useTheme from "@/hooks/useTheme";
import { useDeleteTaskMutation } from "@/services/tasks/tasksApi";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/slices/TasksSlice";
import toast from "react-hot-toast";
import { TaskType } from "@/types/TaskType";
import { BeatLoader } from "react-spinners";
import { showSomeOfText } from "@/utility/TextHelper";
import SelectInput from "../SelectInput";

function TaskViewInList({ task }: { task: TaskType }) {
  const { title, description, list, tags, id } = task;
  const tagsList = tags.split(",");
  const [showDeleteToolbar, setShowDeleteToolbar] = useState<boolean>(false);
  const ui = useTheme();
  const [deleteTaskMutation, { isLoading }] = useDeleteTaskMutation();
  const dispatch = useDispatch();

  async function deleteTaskHandeler(taskId: number) {
    setShowDeleteToolbar(false);
    try {
      await deleteTaskMutation(taskId).unwrap();
      dispatch(deleteTask(taskId));
      toast.success("حذف با موفقیت انجام شد.");
    } catch (err) {
      toast.error("حذف وظیفه به مشکل خورد.");
      console.error("Delete error:", err);
    }
  }

  return (
    <div
      className={`w-full h-full rounded-md ${ui.taskShadow} relative ${ui.taskBg}`}
    >
      <Toolbar showText={showDeleteToolbar} place="-top-[40%] right-[85%]">
        <div>
          <p>آیا اطمینان دارید؟ </p>
          <button
            className="rounded-md bg-red-500 px-2 py-0.5 mx-0.5 cursor-pointer"
            onClick={() => deleteTaskHandeler(id)}
          >
            بله
          </button>
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setShowDeleteToolbar((pre) => !pre);
            }}
          >
            خیر
          </button>
        </div>
      </Toolbar>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center bg-red-500/50 rounded-md">
          <BeatLoader />
        </div>
      ) : (
        <div className="h-full w-full overflow-hidden">
          <div className="flex items-center mb-2 py-2 px-4 justify-between">
            <span className="text-xs rounded-lg bg-slate-800/80 text-slate-200 px-3 py-1">
              {list.trim() !== "" ? list : "بدون دسته بندی"}
            </span>
            <div className="flex gap-2">
              <SelectInput
                defaultValue={task.state}
                options={[
                  { text: "جدید", value: "NEW" },
                  { text: "در حال انجام", value: "ACTIVE" },
                  { text: "انجام شد", value: "DONE" },
                ]}
                setValue={() => {}}
                extraClass="px-1 py-0.5 text-sm"
              />
              <button
                className="cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteToolbar((pre) => !pre);
                }}
              >
                <PiTrashSimple />
              </button>
            </div>
          </div>
          <h3 className="font-bold pb-2 px-4">{title}</h3>
          <p className="text-sm py-2 overflow-hidden px-4">
            {showSomeOfText(description, 50)}
          </p>
          {(task.doneDate || task.todoDate) && (
            <div className="flex flex-col lg:flex-row items-center justify-between text-xs px-4 py-2">
              <p>تاریخ برنامه ریزی شده: {task.todoDate}</p>
              <p>تاریخ انجام: {task.doneDate}</p>
            </div>
          )}
          <div
            className={`text-sm rounded-b-md border-t-1 h-full ${ui.taskTagsBorder} py-1 ${ui.taskTagsBg} px-4`}
          >
            {tagsList.length > 0 && tagsList.at(0)?.trim() !== "" ? (
              tagsList.map((tag: string) => (
                <span
                  className={`text-sm rounded-sm ${ui.taskTagBg} ml-0.5 px-0.5 opacity-70`}
                >
                  {"#" + tag}
                </span>
              ))
            ) : (
              <p>بدون تگ</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskViewInList;
