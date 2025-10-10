"use client";
import React from "react";
import useTheme from "@/hooks/useTheme";
import BeatLoading from "../loader/BeatLoading";
import ChartBg from "./ChartBg";
import TaskCountByStateChart from "./TaskCountByStateChart";
import useTaskList from "../tasks/useTaskList";
import useGetListTag from "../tasks/useGetListTag";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import TaskCountByList from "./TaskCountByList";

function DashboardPage() {
  const ui = useTheme();
  const loginUser = useSelector((store: RootState) => store.User);
  const { tasks, isLoading } = useTaskList();
  const { lists, listsLoading, tags, tagsLoading } = useGetListTag(loginUser);
  if (isLoading) return <BeatLoading />;
  if (!tasks) return <div>در دریافت اطلاعات مشکلی به وجود آمده است.</div>;
  return (
    <div className="flex flex-col lg:flex-row gap-1">
      <ChartBg
        bgColor={ui.taskBg + " " + ui.taskTagsBorder}
        title="تعداد تسک در هر وضعیت"
      >
        <TaskCountByStateChart tasks={tasks} />
      </ChartBg>
      <ChartBg bgColor={ui.taskBg} title="تعداد تسک در هر دسته">
        {listsLoading ? (
          <BeatLoading />
        ) : (
          lists && <TaskCountByList tasks={tasks} lists={lists} />
        )}
      </ChartBg>
    </div>
  );
}

export default DashboardPage;
