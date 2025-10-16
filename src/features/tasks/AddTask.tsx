"use client";
import React from "react";
import TextInputWithLabel from "../infrastructure/inputs/TextInputWithLabel";
import TextAreaWithLabel from "../infrastructure/inputs/TextAreaWithLabel";
import ButtonsContainer from "../infrastructure/buttons/ButtonsContainer";
import PrimaryButton from "../infrastructure/buttons/PrimaryButton";
import useAddTaskForm from "./useAddTaskForm";
import AddEntityForm from "../infrastructure/forms/AddEntityForm";
import SelectInputWithLabel from "../infrastructure/inputs/SelectInputWithLabel";
import BeatLoading from "../loader/BeatLoading";
import MultiSelectWithLabel from "../infrastructure/inputs/MultiSelectWithLabel";

function AddTask() {
  const {
    isLoading,
    clicked,
    task,
    setTask,
    setClicked,
    handleAddTask,
    lists,
    listsLoading,
    tags,
    tagsLoading,
  } = useAddTaskForm();
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
      {listsLoading ? (
        <BeatLoading />
      ) : (
        lists && (
          <SelectInputWithLabel
            label="دسته بندی"
            defaultValue={task.list}
            setValue={(val: string) =>
              setTask((pre) => ({ ...pre, list: val }))
            }
            sizes={["w-1/5", "w-4/5"]}
            options={lists}
          />
        )
      )}
      {tagsLoading ? (
        <BeatLoading />
      ) : (
        tags && (
          <MultiSelectWithLabel
            label="تگ ها"
            sizes={["w-1/5", "w-4/5"]}
            list={tags}
            setterFn={(val: string) =>
              setTask((pre) => ({ ...pre, tags: val }))
            }
          />
        )
      )}
      <TextInputWithLabel
        label="تاریخ برنامه ریزی شده"
        value={task.todoDate}
        sizes={["w-1/5", "w-4/5"]}
        setterFn={(val: string) =>
          setTask((pre) => ({ ...pre, todoDate: val }))
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
