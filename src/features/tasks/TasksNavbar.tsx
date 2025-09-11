"use client";
import useTheme from "@/hooks/useTheme";
import Navbar from "../navbar/Navbar";

type TaskFilterType = { id: string; text: string; icon: string }[];
const taskFilters = {
  date: [
    { id: "all", text: "همه روزها", icon: "" },
    { id: "today", text: "امروز", icon: "" },
    { id: "tommorow", text: "فردا", icon: "" },
    { id: "7days", text: "7 روز آینده", icon: "" },
  ],
  lists: [{ id: "all", text: "همه", icon: "" }],
  tags: [{ id: "all", text: "همه", icon: "" }],
  state: [
    { id: "all", text: "همه", icon: "" },
    { id: "completed", text: "انجام شده", icon: "" },
    { id: "active", text: "در حال انجام", icon: "" },
    { id: "new", text: "جدید", icon: "" },
  ],
};

function TasksNavbar() {
  const ui = useTheme();
  return (
    <Navbar
      extraClass={`w-30 z-8 right-15 ${ui.taskNavBg + " " + ui.taskNavText}`}
    >
      {Object.entries(taskFilters).map(
        ([key, filters]: [string, TaskFilterType]) =>
          filters.length > 0 && (
            <FiltersMenu key={key} menuTitle={key} menuItems={filters} />
          )
      )}
    </Navbar>
  );
}

export default TasksNavbar;

function FilterTitle({ text }: { text: string }) {
  return <p className="text-right font-bold w-full">{text}</p>;
}

function FiltersMenu({
  menuTitle,
  menuItems,
}: {
  menuTitle: string;
  menuItems: TaskFilterType;
}) {
  const ui = useTheme();
  return (
    <div className="w-full">
      <FilterTitle text={menuTitle} />
      {menuItems.map((filter) => (
        <button
          className={`w-full text-right cursor-pointer ${ui.taskNavhoverText}`}
          key={filter.id}
        >
          {filter.text}
        </button>
      ))}
    </div>
  );
}
