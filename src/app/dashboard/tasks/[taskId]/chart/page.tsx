"use client";
import LineAreaChart from "@/features/dashboard/baseCharts/LineAreaChart";
import PageContent from "@/features/PageContent";
import { useParams } from "next/navigation";

function page() {
  const { taskId } = useParams();
  return (
    <PageContent title="نمودار وظیفه">
      {taskId && !Array.isArray(taskId) ? (
        <LineAreaChart />
      ) : (
        <div>تسک مورد نظر یافت نشد</div>
      )}
    </PageContent>
  );
}

export default page;
