import React from "react";
import LineAreaChart from "../dashboard/baseCharts/LineAreaChart";
import { useGetChartQuery } from "@/services/tasks/tasksApi";
import BeatLoading from "../loader/BeatLoading";

function TaskChart({ taskId }: { taskId: string }) {
  const { data, isLoading } = useGetChartQuery(taskId);
  let predictedEstimateHour = 0;
  let realRemainHours: number[] = [];
  let dates: string[] = [];
  let predictedRemainHours: number[] = Array(realRemainHours.length);
  if (data && data.length > 0) {
    predictedEstimateHour = Number(data[data.length - 1].estimateHour);
    const deadlineDate = new Date(data[data.length - 1].todoDate);
    // استخراج تاریخ‌های هدف از todoDate
    const rawDates: Date[] = data.map((d) =>
      !!d.editTime ? new Date(d.editTime) : new Date()
    );

    // اضافه کردن تاریخ‌های اضافی
    if (!!data[data.length - 1].todoDate) rawDates.push(deadlineDate);

    // مرتب‌سازی بر اساس زمان
    rawDates.sort((a, b) => a.getTime() - b.getTime());

    // estimate hours remaining
    const datesBeforeDeadline = [...rawDates].filter(
      (r) => Number(r.getTime()) <= Number(deadlineDate.getTime())
    ).length;
    const step = parseFloat(
      (predictedEstimateHour / (datesBeforeDeadline - 1)).toFixed(2)
    );
    for (let i = 0; i < datesBeforeDeadline; i++) {
      predictedRemainHours[i] = Math.abs(
        Math.ceil(predictedEstimateHour - i * step)
      );
    }

    // تبدیل به رشته شمسی با فرمت لاتین
    const targetDates: string[] = rawDates.map((d) =>
      d.toLocaleDateString("fa-IR-u-nu-latn", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
    // استخراج رکوردهای با editTime معتبر
    const validRecords = data
      .map((d) => ({
        editTime: !!d.editTime ? new Date(d.editTime) : new Date(),
        remainingHour: Number(d.remainingHour),
      }))
      .sort((a, b) =>
        !!a.editTime && !!b.editTime
          ? a.editTime.getTime() - b.editTime.getTime()
          : 0
      );

    // پر کردن realRemainHours بر اساس نزدیک‌ترین رکورد قدیمی‌تر
    realRemainHours = rawDates.map((targetRawDate) => {
      const targetDate = new Date(targetRawDate);

      // پیدا کردن نزدیک‌ترین رکورد قدیمی‌تر
      const candidates = validRecords.filter((r) => {
        return r.editTime.getTime() <= targetDate.getTime();
      });

      if (candidates.length === 0) return 0;

      const closest = candidates[candidates.length - 1];
      return closest.remainingHour;
    });

    dates = targetDates;
  }

  if (isLoading) return <BeatLoading />;
  return (
    <div>
      <LineAreaChart
        firstXYData={{
          name: "باقی مانده",
          values: realRemainHours,
          type: "Area",
        }}
        secondXYData={{
          name: "برنامه ریزی",
          values: predictedRemainHours,
          type: "Line",
        }}
        labels={dates}
        yTitle="ساعات باقی مانده به نسبت ددلاین"
      />
    </div>
  );
}
export default TaskChart;
