"use client";
import { DefinitionType } from "@/types/definitionsType";
import React, { useMemo, useState } from "react";
import TextInput from "../infrastructure/inputs/TextInput";
import useTheme from "@/hooks/useTheme";
import {
  RiDeleteBin2Line,
  RiLightbulbFlashFill,
  RiLightbulbLine,
} from "react-icons/ri";
import PrimaryButton from "../infrastructure/buttons/PrimaryButton";
import Button from "../infrastructure/buttons/Button";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Toolbar from "../infrastructure/Toolbar";
import ToolbarConfirmation from "../infrastructure/ToolbarConfirmation";

function DefinitionInList({
  data,
  mutationFunc,
  dispatchFunc,
  deleteMutationFunc,
  deleteDispatchFunc,
}: {
  data: DefinitionType;
  mutationFunc: Function;
  dispatchFunc: Function;
  deleteMutationFunc: Function;
  deleteDispatchFunc: Function;
}) {
  const ui = useTheme();
  const [changedData, setChangedData] = useState<DefinitionType>(data);
  const [showDeleteToolbar, setShowDeleteToolbar] = useState<boolean>(false);
  const [useDelete, { isLoading: isDeleting }] = deleteMutationFunc();
  const [useUpdate, { isLoading }] = mutationFunc();
  const dispatch = useDispatch();

  async function deleteHandler() {
    try {
      await useDelete(changedData);
      await dispatch(deleteDispatchFunc(changedData));
      toast.success("با موفقیت حذف شد.");
      setShowDeleteToolbar(false);
    } catch (e: any) {
      console.log(e);
      toast.error("حذف به خطا خورد.");
    }
  }
  const isEditted = useMemo(() => {
    return (
      data.text.trim() !== changedData.text.trim() ||
      data.value.trim() !== changedData.value.trim() ||
      data.active !== changedData.active
    );
  }, [data, changedData]);
  function cancel() {
    setChangedData(data);
  }
  async function edit() {
    if (!!changedData.text.trim() && !!changedData.value.trim()) {
      try {
        await useUpdate(changedData).unwrap();
        await dispatch(dispatchFunc(changedData));
        toast.success("به درستی آپدیت شد");
        setChangedData(data);
      } catch {
        toast.error("بروز نشد ");
      }
    }
  }

  return (
    <div
      className={`relative px-4 py-3 rounded-md ${
        ui.taskBg + " " + ui.taskShadow
      }`}
    >
      {!!changedData.id && (
        <Toolbar showText={showDeleteToolbar} place="-top-10 -left-8">
          <ToolbarConfirmation
            buttons={["بله", "انصراف"]}
            deleteHandeler={deleteHandler}
            deleteItemId={changedData.id}
            setShowToolbar={setShowDeleteToolbar}
            text="آیا اطمینان دارید؟"
          />
        </Toolbar>
      )}
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
        <RiDeleteBin2Line
          className="size-20 text-red-500 cursor-pointer"
          onClick={() => setShowDeleteToolbar((pre) => !pre)}
        />
      </div>
      <div
        className={`${
          isEditted ? "opacity-100 h-20" : "opacity-0 h-0"
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
