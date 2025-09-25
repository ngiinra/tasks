import DefinitionInList from "./DefinitionInList";
import { DefinitionType } from "@/types/definitionsType";

function DefinitionList({ dataList }: { dataList: DefinitionType[] }) {
  if (dataList && dataList.length === 0)
    return <p className="text-center w-full">هیچ دیتایی تعریف نکرده اید.</p>;
  return (
    <div className="flex flex-wrap w-full my-2 p-1 items-start">
      {dataList &&
        dataList.map((list: DefinitionType) => (
          <div className="w-full md:w-1/2 p-3 min-h-30">
            <DefinitionInList key={list.id} data={list} />
          </div>
        ))}
    </div>
  );
}

export default DefinitionList;
