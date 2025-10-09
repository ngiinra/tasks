"use client";
import PageContent from "@/features/PageContent";
import TaskView from "@/features/tasks/TaskView";
import { useParams } from "next/navigation";
import React from "react";

function page() {
  const { taskId } = useParams();
  return (
    <PageContent title="تسک">
      {taskId && !Array.isArray(taskId) ? (
        <TaskView taskId={taskId} />
      ) : (
        <div>تسک مورد نظر یافت نشد</div>
      )}
    </PageContent>
  );
}

export default page;
