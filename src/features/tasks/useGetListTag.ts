import { useGetListQuery } from "@/services/list/listApi";
import { useGetTagsQuery } from "@/services/tags/tagsApi";
import { UserType } from "@/types/UserTypes";

export default function useGetListTag(loginUser: UserType) {
  const { data: lists, isLoading: listsLoading } = useGetListQuery(
    loginUser.userId,
    { skip: !loginUser.userId || loginUser.userId === "" }
  );

  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery(
    loginUser.userId,
    { skip: !loginUser.userId || loginUser.userId === "" }
  );

  return { lists, listsLoading, tags, tagsLoading };
}
