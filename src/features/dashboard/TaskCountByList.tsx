import { TaskType } from "@/types/TaskType";
import BarChart from "./baseCharts/BarChart";
import { DefinitionType } from "@/types/definitionsType";

function TaskCountByList({
  tasks,
  lists,
}: {
  tasks: TaskType[];
  lists: DefinitionType[];
}) {
  const eachListTaskCount = (listKey: string) =>
    tasks.filter((t) => t.list === listKey).length;

  return (
    <BarChart
      labels={lists.map((list) => list.text)}
      data={lists.map((l) => eachListTaskCount(l.value))}
    />
  );
}

export default TaskCountByList;
