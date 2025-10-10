"use client";

import BeatLoading from "../loader/BeatLoading";
import TextInputWithLabel from "../TextInputWithLabel";
import SelectInputWithLabel from "../SelectInputWithLabel";
import MultiSelectWithLabel from "../MultiSelectWithLabel";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import ButtonsContainer from "../ButtonsContainer";
import PrimaryButton from "../PrimaryButton";
import Button from "../Button";
import InputGroups from "../inputs/InputGroups";
import Devider from "../Devider";
import useDeleteTask from "./useDeleteTask";
import Toolbar from "../Toolbar";
import { BeatLoader } from "react-spinners";
import useTaskView from "./useTaskView";

const sizes = ["w-full md:w-1/6", "w-full md:w-5/6"];
const colSizes = ["w-full md:w-1/3", "w-full md:w-2/3"];

function TaskView({ taskId }: { taskId: string }) {
  const {
    showDeleteToolbar,
    setShowDeleteToolbar,
    deleteLoading,
    deleteTaskHandeler,
  } = useDeleteTask();

  const {
    data,
    isLoading,
    isError,
    lists,
    listsLoading,
    tags,
    tagsLoading,
    task,
    setTask,
    defaultSelectedTags,
    isUpdating,
    handleUpdateTask,
  } = useTaskView(taskId);

  if (isLoading) return <BeatLoading />;
  if (!isLoading && isError && !task)
    return <div>در دریافت اطلاعات خطایی به وجود آمده است.</div>;
  return (
    task && (
      <form className="space-y-3 bg-inherit relative">
        {(deleteLoading || isUpdating) && (
          <div
            className={`w-full h-full rounded-md flex items-center justify-center absolute ${
              deleteLoading && "bg-red-500"
            } ${isUpdating && "bg-green-500"} z-5`}
          >
            <BeatLoader />
          </div>
        )}
        <TextInput
          placeHolder="عنوان تسک*"
          value={task.title}
          setterFn={(val: string) => setTask((pre) => ({ ...pre, title: val }))}
          name="taskTitle"
        />
        <TextArea
          placeHolder="توضیحات"
          value={task.description}
          setterFn={(val: string) =>
            setTask((pre) => ({ ...pre, description: val }))
          }
        />

        {tagsLoading ? (
          <BeatLoading />
        ) : (
          tags && (
            <MultiSelectWithLabel
              label="تگ ها"
              list={tags}
              setterFn={(val: string) =>
                setTask((pre) => ({ ...pre, tags: val }))
              }
              sizes={sizes}
              defaultValues={defaultSelectedTags}
            />
          )
        )}
        <div className="flex flex-col md:flex-row gap-3">
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
                options={lists}
                sizes={colSizes}
              />
            )
          )}
          {!task.state ? (
            <BeatLoading />
          ) : (
            <InputGroups
              label="تغییر وضعیت به"
              name="state"
              options={[
                { label: "جدید", value: "NEW" },
                { label: "در حال انجام", value: "ACTIVE" },
                { label: "اتمام", value: "DONE" },
              ]}
              defaultValue={task.state}
              sizes={colSizes}
            />
          )}
        </div>
        <Devider title="زمان بندی" />
        <div className="flex lg:flex-row flex-col gap-3">
          <div className="space-y-3 flex-1">
            <TextInputWithLabel
              label="ساعت تخمینی"
              setterFn={(val: string) =>
                setTask((pre) => ({ ...pre, estimateHour: val }))
              }
              value={task.estimateHour}
              sizes={colSizes}
            />
            <TextInputWithLabel
              label="ساعت باقی مانده"
              setterFn={(val: string) =>
                setTask((pre) => ({ ...pre, remainingHour: val }))
              }
              value={task.remainingHour}
              sizes={colSizes}
            />
            <TextInputWithLabel
              label="ساعت انجام شده"
              setterFn={(val: string) =>
                setTask((pre) => ({ ...pre, completedHour: val }))
              }
              value={task.completedHour}
              sizes={colSizes}
            />
          </div>
          <div className="space-y-3 flex-1">
            <TextInputWithLabel
              label="تاریخ ددلاین"
              setterFn={(val: string) =>
                setTask((pre) => ({ ...pre, todoDate: val }))
              }
              value={task.todoDate}
              sizes={colSizes}
            />
            <TextInputWithLabel
              label="تاریخ انجام شده"
              setterFn={(val: string) =>
                setTask((pre) => ({ ...pre, doneDate: val }))
              }
              value={task.doneDate}
              sizes={colSizes}
              readonly={true}
            />
          </div>
        </div>
        <ButtonsContainer>
          {data && !data.deleted ? (
            <div className="relative md:w-1/4 w-full">
              <Toolbar
                showText={showDeleteToolbar}
                place="-top-[100%] right-[35%]"
              >
                <div>
                  <p>آیا اطمینان دارید؟ </p>
                  <button
                    className="rounded-md bg-red-500 px-2 py-0.5 mx-0.5 cursor-pointer"
                    onClick={() => deleteTaskHandeler(task.id)}
                  >
                    بله
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDeleteToolbar((pre) => !pre);
                    }}
                  >
                    خیر
                  </button>
                </div>
              </Toolbar>
              <Button
                text="حذف"
                isLoading={false}
                onClick={() => setShowDeleteToolbar((pre) => !pre)}
                extraClass="bg-red-800 w-full"
              />
            </div>
          ) : (
            data &&
            data.deleted && (
              <Button
                text="بازیابی"
                isLoading={false}
                onClick={() => {}}
                extraClass="bg-blue-800 w-full md:w-1/4"
              />
            )
          )}
          <PrimaryButton
            text="ثبت"
            isLoading={isUpdating}
            onClick={handleUpdateTask}
            extraClass="w-full md:w-1/4"
          />
        </ButtonsContainer>
      </form>
    )
  );
}

export default TaskView;
