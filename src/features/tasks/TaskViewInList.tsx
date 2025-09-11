import React from "react";

function TaskViewInList({ title }: { title: string }) {
  return (
    <div className="w-1/2 p-1 rounded-md border-1 bg-transparent">
      <h3 className="font-light text-lg">{title}</h3>
    </div>
  );
}

export default TaskViewInList;
