import { useGetListQuery } from "@/services/list/listApi";
import { useGetTagsQuery } from "@/services/tags/tagsApi";
import { UserType } from "@/types/UserTypes";

export default function useGetListTag(loginUser: UserType) {
  const { data: lists, isLoading: listsLoading } = useGetListQuery(
    loginUser.userId.trim(),
    { skip: !loginUser.userId || loginUser.userId.trim() === "" }
  );

  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery(
    loginUser.userId.trim(),
    { skip: !loginUser.userId || loginUser.userId.trim() === "" }
  );

  return {lists, listsLoading, tags, tagsLoading};
}
