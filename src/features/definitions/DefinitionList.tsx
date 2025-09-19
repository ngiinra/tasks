import { useGetListQuery } from "@/services/list/listApi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setLists } from "@/slices/ListSlice";
import BeatLoading from "../loader/BeatLoading";
import DefinitionInList from "./DefinitionInList";
import { DefinitionType } from "@/types/definitionsType";

function DefinitionList() {
  const dispatch = useDispatch();
  const loginUser = useSelector((store: RootState) => store.User);
  const {
    data: userLists,
    isLoading,
    isError,
  } = useGetListQuery(loginUser.userId.trim(), {
    skip: !loginUser.userId || loginUser.userId.trim() === "",
  });
  useEffect(() => {
    if (userLists) {
      dispatch(setLists(userLists));
    }
  }, [userLists]);

  if (isLoading) return <BeatLoading />;
  if (isError) return <div>در دریافت اطلاعات مشکلی به وجود آمده است.</div>;
  if (userLists && userLists.length === 0)
    return <p>شما دسته بندی ای تعریف نکرده اید.</p>;
  return (
    <div className="flex flex-wrap w-full my-2 p-1 items-center">
      {userLists &&
        userLists.map((list: DefinitionType) => (
          <div className="w-full md:w-1/2 p-3 h-30">
            <DefinitionInList key={list.id} data={list} />
          </div>
        ))}
    </div>
  );
}

export default DefinitionList;
