"use client";
import React from "react";
import TextInputWithLabel from "../TextInputWithLabel";
import TextAreaWithLabel from "../TextAreaWithLabel";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ButtonsContainer from "../ButtonsContainer";
import PrimaryButton from "../PrimaryButton";
import { Toaster } from "react-hot-toast";
import useAddTaskForm from "./useAddTaskForm";

function AddTask() {
  const { isLoading, clicked, task, setTask, handleShowForm, handleAddTask } =
    useAddTaskForm();
  return (
    <div className="w-full border-1 rounded-md p-3 text-center">
      <Toaster />
      <p
        className={`cursor-pointer transition-all duration-400 ${
          clicked ? "opacity-0 invisible h-0" : "visible opacity-100 h-auto"
        }`}
        onClick={handleShowForm}
      >
        + افزودن وظیفه
      </p>
      <form
        className={`transition-all duration-200 space-y-2 ${
          clicked ? "visible opacity-100 h-auto" : "opacity-0 invisible h-0"
        }`}
      >
        <div className="flex justify-between items-center p-2 border-b-1 mb-3">
          <h2 className="text-md">افزودن تسک</h2>
          <MdOutlineKeyboardBackspace
            className="size-8 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={handleShowForm}
          />
        </div>
        <TextInputWithLabel
          label="عنوان*"
          value={task.title}
          sizes={["w-1/5", "w-4/5"]}
          setterFn={(val: string) => setTask((pre) => ({ ...pre, title: val }))}
        />
        <TextAreaWithLabel
          label="جزئیات"
          value={task.description}
          sizes={["w-1/5", "w-4/5"]}
          setterFn={(val: string) =>
            setTask((pre) => ({ ...pre, description: val }))
          }
        />
        <ButtonsContainer>
          <PrimaryButton
            text="افزودن"
            isLoading={isLoading}
            onClick={handleAddTask}
            extraClass="w-1/2"
          />
        </ButtonsContainer>
      </form>
    </div>
  );
}

export default AddTask;
