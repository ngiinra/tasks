"use client";
import React from "react";
import TextInputWithLabel from "../TextInputWithLabel";
import TextAreaWithLabel from "../TextAreaWithLabel";
import ButtonsContainer from "../ButtonsContainer";
import PrimaryButton from "../PrimaryButton";
import useAddTaskForm from "./useAddTaskForm";
import AddEntityForm from "../AddEntityForm";

function AddTask() {
  const { isLoading, clicked, task, setTask, setClicked, handleAddTask } =
    useAddTaskForm();
  return (
    <AddEntityForm
      clicked={clicked}
      isLoading={isLoading}
      entityName="وظیفه"
      setClicked={setClicked}
    >
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
    </AddEntityForm>
  );
}

export default AddTask;
