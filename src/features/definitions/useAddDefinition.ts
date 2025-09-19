import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useAddListMutation } from "@/services/list/listApi";
import { addList } from "@/slices/ListSlice";
import toast from "react-hot-toast";

export default function useAddDefinition() {
  type NewDefinitionType = {
    text: string;
    value: string;
    cat: string;
    userId: string;
  };
  const definitionTypes = [
    { text: "تگ", value: "tag" },
    { text: "دسته بندی", value: "list" },
  ];
  const initialVal = {
    text: "",
    value: "",
    cat: definitionTypes[0].value,
    userId: "",
  };
  //نمایش فرم
  const [clicked, setClicked] = useState<boolean>(false);
  // مقادیر فرم
  const [newDefinition, setNewDefinition] =
    useState<NewDefinitionType>(initialVal);
  const user = useSelector((store: RootState) => store.User);
  useEffect(() => {
    setNewDefinition((pre) => ({ ...pre, userId: user.userId.trim() }));
  }, [user.userId]);
  // لیست یا دسته بندی
  const [addListMutation, { isLoading: addListLoading }] = useAddListMutation();
  const dispatch = useDispatch();
  async function handleAddDefinition() {
    if (newDefinition.userId.trim() !== "") {
      if (newDefinition.cat === "list") {
        try {
          await addListMutation({
            text: newDefinition.text,
            value: newDefinition.value,
            userId: newDefinition.userId,
          }).unwrap();
          dispatch(
            addList({
              text: newDefinition.text,
              value: newDefinition.value,
              userId: newDefinition.userId,
            })
          );
          toast.success("لیست افزوده شد.");
          setNewDefinition({ ...initialVal, userId: newDefinition.userId });
          setClicked(false);
        } catch (err) {
          toast.error("افزودن لیست به خطا خورد.");
          console.log(err);
        }
      }
    }
  }

  return {
    definitionTypes,
    newDefinition,
    setNewDefinition,
    addListLoading,
    handleAddDefinition,
    clicked,
    setClicked,
  };
}
