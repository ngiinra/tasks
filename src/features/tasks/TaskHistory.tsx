import { useGetHistoryQuery } from "@/services/tasks/tasksApi";
import React, { useEffect, useState } from "react";
import BeatLoading from "../loader/BeatLoading";
import useTheme from "@/hooks/useTheme";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
type ChangesType = {
  key: string;
  before: string;
  after: string;
};
type CardType = {
  editTime: string;
  changes: ChangesType[];
};

function TaskHistory({ taskId }: { taskId: string }) {
  const { data, isLoading } = useGetHistoryQuery(taskId);
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    if (data && data.length > 1) {
      setCards(compareRecords(data));
    }
  }, [data]);

  if (isLoading) return <BeatLoading />;
  return (
    <div>
      <ul className="flex flex-col gap-5">
        {!!cards && cards.length > 0 ? (
          [...cards]
            .reverse()
            .map((d) => <HistoryCard cardData={d} key={d.editTime} />)
        ) : (
          <div className="opacity-60">برای وظیفه تاریخچه ای وجود ندارد.</div>
        )}
      </ul>
    </div>
  );
}

export default TaskHistory;

function HistoryCard({ cardData }: { cardData: CardType }) {
  const ui = useTheme();
  const [openState, setOpenState] = useState<boolean>(false);
  return (
    <div
      className={`relative text-sm overflow-hidden rounded-md py-4 px-5 ${
        ui.inputBg
      } ${
        openState
          ? "max-h-100  transition-all duration-400"
          : "h-10 transition-all duration-400"
      }`}
    >
      <div
        className="flex justify-between cursor-pointer items-center"
        onClick={() => setOpenState((pre: boolean) => !pre)}
      >
        <h3 className=" font-bold">
          تاریخ {new Date(cardData.editTime).toLocaleString("fa").toString()}
        </h3>
        <div>{openState ? <FaChevronUp /> : <FaChevronDown />}</div>
      </div>
      <div className="w-full text-center mt-5">
        <div
          className={`flex flex-col md:flex-row w-full rounded-t-sm ${ui.navbarBg} ${ui.navbarItem}`}
        >
          <div className="p-1 flex-1">فیلد</div>
          <div className="p-1 flex-1">مقدار قبل</div>
          <div className="p-1 flex-1">مقدار جدید</div>
        </div>
        {cardData.changes.map((change) => (
          <div
            className={`flex flex-col md:flex-row w-full border-b-1 ${ui.mainBorder}`}
            key={change.key}
          >
            <div className="p-1 flex-1">{change.key}</div>
            <div className="p-1 flex-1">{change.before}</div>
            <div className="p-1 flex-1">{change.after}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function compareRecords(records: Record<string, any>[]) {
  const cards: {
    editTime: string;
    changes: ChangesType[];
  }[] = [];
  for (let i = 1; i < records.length; i++) {
    const prev = records[i - 1];
    const curr = records[i];
    const changes: ChangesType[] = [];

    for (const key in curr) {
      if (
        key !== "editTime" &&
        key !== "guid" &&
        curr[key] !== prev[key] &&
        !(curr[key] == null && prev[key] == null)
      ) {
        changes.push({
          key: key,
          before: prev[key] ? prev[key] : "-",
          after: curr[key] ? curr[key] : "-",
        });
      }
    }

    if (changes.length > 0) {
      cards.push({
        editTime: curr.editTime,
        changes,
      });
    }
  }

  return cards;
}
