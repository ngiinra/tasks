import { DefinitionType } from "@/types/definitionsType";
import React from "react";
import TextInput from "../TextInput";
import { WiMoonFull } from "react-icons/wi";
import useTheme from "@/hooks/useTheme";
import { RiLightbulbFlashFill, RiLightbulbLine } from "react-icons/ri";

function DefinitionInList({ data }: { data: DefinitionType }) {
  const ui = useTheme();
  return (
    <div
      className={`flex w-full items-center justify-center gap-2 px-4 py-3 rounded-md ${
        ui.taskBg + " " + ui.taskShadow
      }`}
    >
      <TextInput value={data.text} setterFn={() => {}} />
      <TextInput value={data.value} setterFn={() => {}} />
      {data.active ? (
        <RiLightbulbFlashFill className="text-yellow-300 size-20 text-shadow-md" />
      ) : (
        <RiLightbulbLine className="text-stone-600 size-20" />
      )}
    </div>
  );
}

export default DefinitionInList;
