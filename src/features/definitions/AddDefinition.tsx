"use client";
import TextInputWithLabel from "../TextInputWithLabel";
import SelectInputWithLabel from "../SelectInputWithLabel";
import PrimaryButton from "../PrimaryButton";
import useAddDefinition from "./useAddDefinition";
import AddEntityForm from "../AddEntityForm";

const sizes = ["md:w-1/4 w-full", "md:w-3/4 w-full"];
export default function AddDefinitions() {
  const {
    definitionTypes,
    newDefinition,
    setNewDefinition,
    addListLoading,
    addTagLoading,
    handleAddDefinition,
    clicked,
    setClicked,
  } = useAddDefinition();
  return (
    <AddEntityForm
      isLoading={addListLoading || addTagLoading}
      entityName="تعاریف"
      clicked={clicked}
      setClicked={setClicked}
    >
      <div className="space-y-2 my-5">
        <div className="flex flex-col md:flex-row justify-center gap-2 items-center">
          <TextInputWithLabel
            value={newDefinition.text}
            setterFn={(val: string) =>
              setNewDefinition((pre) => ({ ...pre, text: val }))
            }
            label="عنوان فارسی:"
            sizes={sizes}
          />
          <TextInputWithLabel
            value={newDefinition.value}
            setterFn={(val: string) =>
              setNewDefinition((pre) => ({ ...pre, value: val }))
            }
            label="عنوان انگلیسی:"
            sizes={sizes}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-2 items-center">
          <div className="md:w-1/2 w-full">
            <SelectInputWithLabel
              options={definitionTypes}
              label="تعاریف"
              sizes={sizes}
              defaultValue={newDefinition.cat}
              setValue={(val: string) =>
                setNewDefinition((pre) => ({ ...pre, cat: val }))
              }
            />
          </div>
          <div className="md:w-1/2 w-full">
            <PrimaryButton
              text="افزودن"
              onClick={handleAddDefinition}
              isLoading={false}
              deactive={
                !newDefinition.cat.trim() ||
                !newDefinition.text.trim() ||
                !newDefinition.value.trim()
              }
              extraClass="w-3/4 float-left -ml-1"
            />
          </div>
        </div>
      </div>
    </AddEntityForm>
  );
}
