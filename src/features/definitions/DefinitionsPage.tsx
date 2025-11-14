"use client";

import { useDispatch, useSelector } from "react-redux";
import Devider from "../infrastructure/Devider";
import AddDefinitions from "./AddDefinition";
import DefinitionList from "./DefinitionList";
import { RootState } from "../../../store";
import {
  useGetListQuery,
  useUpdateListMutation,
} from "@/services/list/listApi";
import { useEffect } from "react";
import { setLists, updateList } from "@/slices/ListSlice";
import BeatLoading from "../loader/BeatLoading";
import { useGetTagsQuery, useUpdateTagMutation } from "@/services/tags/tagsApi";
import { updateTag } from "@/slices/TagsSlice";

function DefinitionsPage() {
  const dispatch = useDispatch();
  const loginUser = useSelector((store: RootState) => store.User);
  const {
    data: userLists,
    isLoading: listLoading,
    isError: listError,
  } = useGetListQuery(loginUser.userId, {
    skip: !loginUser.userId,
  });
  const {
    data: userTags,
    isLoading: tagLoading,
    isError: tagError,
  } = useGetTagsQuery(loginUser.userId, {
    skip: !loginUser.userId,
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
      {userLists && (
        <DefinitionList
          dataList={userLists}
          dispatchFunc={updateList}
          mutationFunc={useUpdateListMutation}
        />
      )}
      <Devider title="تگ های من" />
      <ManageDefinitionItems isError={tagError} isLoading={tagLoading} />
      {userTags && (
        <DefinitionList
          dataList={userTags}
          dispatchFunc={updateTag}
          mutationFunc={useUpdateTagMutation}
        />
      )}
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
