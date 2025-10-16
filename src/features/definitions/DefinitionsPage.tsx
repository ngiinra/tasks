"use client";

import { useDispatch, useSelector } from "react-redux";
import Devider from "../infrastructure/Devider";
import AddDefinitions from "./AddDefinition";
import DefinitionList from "./DefinitionList";
import { RootState } from "../../../store";
import { useGetListQuery } from "@/services/list/listApi";
import { useEffect } from "react";
import { setLists } from "@/slices/ListSlice";
import BeatLoading from "../loader/BeatLoading";
import { useGetTagsQuery } from "@/services/tags/tagsApi";

function DefinitionsPage() {
  const dispatch = useDispatch();
  const loginUser = useSelector((store: RootState) => store.User);
  const {
    data: userLists,
    isLoading: listLoading,
    isError: listError,
  } = useGetListQuery(loginUser.userId.trim(), {
    skip: !loginUser.userId || loginUser.userId.trim() === "",
  });
  const {
    data: userTags,
    isLoading: tagLoading,
    isError: tagError,
  } = useGetTagsQuery(loginUser.userId.trim(), {
    skip: !loginUser.userId || loginUser.userId.trim() === "",
  });
  useEffect(() => {
    if (userLists) {
      dispatch(setLists(userLists));
    }
    if (userTags) {
      dispatch(setLists(userTags));
    }
  }, [userLists, userTags]);

  return (
    <div className="bg-inherit">
      <AddDefinitions />
      <Devider title="لیست های من" />
      <ManageDefinitionItems isError={listError} isLoading={listLoading} />
      {userLists && <DefinitionList dataList={userLists} />}
      <Devider title="تگ های من" />
      <ManageDefinitionItems isError={tagError} isLoading={tagLoading} />
      {userTags && <DefinitionList dataList={userTags} />}
    </div>
  );
}

export default DefinitionsPage;

function ManageDefinitionItems({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) return <BeatLoading />;
  else if (isError) return <div>در دریافت اطلاعات مشکلی به وجود آمده است.</div>;
}
