"use client";
import { DefinitionType } from "@/types/definitionsType";
import React, { useState } from "react";
import TextInput from "../TextInput";
import useTheme from "@/hooks/useTheme";
import { RiLightbulbFlashFill, RiLightbulbLine } from "react-icons/ri";
import PrimaryButton from "../PrimaryButton";
import Button from "../Button";

function DefinitionInList({ data }: { data: DefinitionType }) {
  const ui = useTheme();
  const [changedData, setChangedData] = useState<DefinitionType>(data);
  const changed =
    data.text.trim() !== changedData.text.trim() ||
    data.value.trim() !== changedData.value.trim();
  return (
    <div className={`px-4 py-3 rounded-md ${ui.taskBg + " " + ui.taskShadow}`}>
      <div className="flex w-full items-center justify-center gap-2">
        <TextInput
          value={changedData.text}
          setterFn={(val: string) =>
            setChangedData((pre) => ({ ...pre, text: val }))
          }
        />
        <TextInput
          value={changedData.value}
          setterFn={(val: string) =>
            setChangedData((pre) => ({ ...pre, value: val }))
          }
        />
        {changedData.active ? (
          <RiLightbulbFlashFill
            className="text-yellow-300 size-20 text-shadow-lg shadow-yellow-300 cursor-pointer"
            onClick={() => setChangedData((pre) => ({ ...pre, active: 0 }))}
          />
        ) : (
          <RiLightbulbLine
            className="text-stone-600 size-20 cursor-pointer"
            onClick={() => setChangedData((pre) => ({ ...pre, active: 1 }))}
          />
        )}
      </div>
      <div
        className={`${
          changed ? "opacity-100 h-20" : "opacity-0 h-0"
        } w-full flex flex-col md:flex-row duration-300 transition-all`}
      >
        <PrimaryButton
          isLoading={false}
          text="اعمال تغییرات"
          extraClass="bg-green-500 md:w-[50%] m-0 h-[60%] text-sm"
          onClick={() => {}}
        />
        <Button
          isLoading={false}
          text="انصراف"
          onClick={() => {}}
          extraClass="md:w-[50%] m-0 py-1 h-[60%] text-sm"
        />
      </div>
    </div>
  );
}

export default DefinitionInList;
