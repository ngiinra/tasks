import DefinitionInList from "./DefinitionInList";
import { DefinitionType } from "@/types/definitionsType";

function DefinitionList({
  dataList,
  dispatchFunc,
  mutationFunc,
  deleteDispatchFunc,
  deleteMutationFunc,
}: {
  dataList: DefinitionType[];
  dispatchFunc: Function;
  mutationFunc: Function;
  deleteDispatchFunc: Function;
  deleteMutationFunc: Function;
}) {
  if (dataList && dataList.length === 0)
    return <p className="text-center w-full">هیچ دیتایی تعریف نکرده اید.</p>;
  return (
    <div className="flex flex-wrap w-full my-2 p-1 items-start">
      {dataList &&
        dataList.map(
          (data: DefinitionType) =>
            !!data.id && (
              <div className="w-full md:w-1/2 p-3 min-h-30">
                <DefinitionInList
                  key={data.id}
                  data={data}
                  dispatchFunc={dispatchFunc}
                  mutationFunc={mutationFunc}
                  deleteDispatchFunc={deleteDispatchFunc}
                  deleteMutationFunc={deleteMutationFunc}
                />
              </div>
            )
        )}
    </div>
  );
}

export default DefinitionList;
