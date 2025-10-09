"use client";
import { useDeleteTaskMutation } from "@/services/tasks/tasksApi";
import { deleteTask } from "@/slices/TasksSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function useDeleteTask() {
  const [showDeleteToolbar, setShowDeleteToolbar] = useState<boolean>(false);
  const [
    deleteTaskMutation,
    { isLoading: deleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteTaskMutation();
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

  return {
    showDeleteToolbar,
    setShowDeleteToolbar,
    deleteLoading,
    deleteTaskHandeler,
    isDeleteSuccess,
  };
}
