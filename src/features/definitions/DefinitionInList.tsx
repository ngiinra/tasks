"use client";
import { DefinitionType } from "@/types/definitionsType";
import React, { useEffect, useState } from "react";
import TextInput from "../infrastructure/inputs/TextInput";
import useTheme from "@/hooks/useTheme";
import { RiLightbulbFlashFill, RiLightbulbLine } from "react-icons/ri";
import PrimaryButton from "../infrastructure/buttons/PrimaryButton";
import Button from "../infrastructure/buttons/Button";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function DefinitionInList({
  data,
  mutationFunc,
  dispatchFunc,
}: {
  data: DefinitionType;
  mutationFunc: Function;
  dispatchFunc: Function;
}) {
  const ui = useTheme();
  const [changedData, setChangedData] = useState<DefinitionType>(data);
  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    if (
      data.text.trim() !== changedData.text.trim() ||
      data.value.trim() !== changedData.value.trim() ||
      data.active !== changedData.active
    ) {
      setEditMode(true);
    }
  }, [changedData]);

  const [useUpdate, { isLoading }] = mutationFunc();
  const dispatch = useDispatch();
  function cancel() {
    setChangedData(data);
    setEditMode(false);
  }
  async function edit() {
    if (!!changedData.text.trim() && !!changedData.value.trim()) {
      try {
        await useUpdate(changedData).unwrap();
        dispatch(dispatchFunc(changedData));
        toast.success("به درستی آپدیت شد");
        setEditMode(false);
      } catch {
        toast.error(" بروز نشد ");
      }
    }
  }
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
          editMode ? "opacity-100 h-20" : "opacity-0 h-0"
        } w-full flex flex-col md:flex-row duration-300 transition-all`}
      >
        <PrimaryButton
          isLoading={isLoading}
          text="اعمال تغییرات"
          extraClass="bg-green-500 md:w-[50%] m-0 h-[60%] text-sm"
          onClick={edit}
        />
        <Button
          isLoading={false}
          text="انصراف"
          onClick={cancel}
          extraClass="md:w-[50%] m-0 py-1 h-[60%] text-sm"
        />
      </div>
    </div>
  );
}

export default DefinitionInList;
