import PageContent from "@/features/PageContent";
import AddTask from "@/features/tasks/AddTask";
import TasksList from "@/features/tasks/TasksList";
import React from "react";

function page() {
  return (
    <div>
      {/* <TasksNavbar /> */}
      <PageContent title="وظایف">
        <AddTask />
        <TasksList />
      </PageContent>
    </div>
  );
}

export default page;
