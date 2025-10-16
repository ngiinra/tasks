"use client";
import PageWithTabs from "@/features/infrastructure/page/PageWithTabs";
import TaskChart from "@/features/tasks/TaskChart";
import TaskHistory from "@/features/tasks/TaskHistory";
import TaskView from "@/features/tasks/TaskView";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaChartLine, FaHistory } from "react-icons/fa";
import { FaFeatherPointed } from "react-icons/fa6";

function page() {
  const tabsData = [
    { title: "مشخصات", icon: <FaFeatherPointed /> },
    { title: "نمودار", icon: <FaChartLine /> },
    { title: "تاریخچه", icon: <FaHistory /> },
  ];
  const { taskId } = useParams();
  const [tab, setTab] = useState<string>(tabsData[0].title);
  if (!taskId) return <div>تسک مورد نظر یافت نشد</div>;
  return (
    <PageWithTabs
      tabsTitle={tabsData.map((tab) => tab.title)}
      setTabFunc={setTab}
      activeTab={tab}
      tabsIcons={tabsData.map((tab) => tab.icon)}
    >
      {tab === tabsData[0].title && !Array.isArray(taskId) ? (
        <TaskView taskId={taskId} />
      ) : tab === tabsData[1].title && !Array.isArray(taskId) ? (
        <TaskChart />
      ) : (
        tab === tabsData[2].title &&
        !Array.isArray(taskId) && <TaskHistory taskId={taskId} />
      )}
    </PageWithTabs>
  );
}

export default page;
