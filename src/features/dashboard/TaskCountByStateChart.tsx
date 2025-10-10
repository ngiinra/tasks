import { TaskType } from "@/types/TaskType";
import BarChart from "./baseCharts/BarChart";

function TaskCountByStateChart({ tasks }: { tasks: TaskType[] }) {
  const states = ["NEW", "ACTIVE", "DONE"];
  const persianState = ["جدید", "در حال انجام", "اتمام"];
  const eachStateTaskCount = (stateKey: string) =>
    tasks.filter((task) => task.state === stateKey).length;

  return (
    <BarChart
      labels={persianState}
      data={states.map((s) => eachStateTaskCount(s))}
    />
  );
}

export default TaskCountByStateChart;
