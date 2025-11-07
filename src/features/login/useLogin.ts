import { useGetLoginUserMutation } from "@/services/users/userDataApi";
import { setUser } from "@/slices/UserSlice";
import { LoginType } from "@/types/UserTypes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function useLogin(loginData: LoginType) {
  const router = useRouter();
  const [useGetLoginUser, { isLoading }] = useGetLoginUserMutation();
  const dispatch = useDispatch();
  async function handleLogin() {
    if (!!loginData.password.trim() && !!loginData.username.trim()) {
      try {
        const res = await useGetLoginUser(loginData).unwrap();
        dispatch(setUser(res));
        toast.success("به صفحه کاربری خود خوش آمدید");
        router.push("/dashboard");
      } catch (e: any) {
        if (e.status === "401") {
          toast.error("کاربری با این اطلاعات وجود ندارد");
        } else if (e.status === "500") {
          toast.error("خطایی به وجود آمد لطفا چند دقیقه بعد مجدد امتحان کنید.");
        } else {
          toast.error("لاگین انجام نشد");
        }
      }
    } else {
      toast.error("فیلدها خالی هستند.");
    }
  }

  return { isLoading, handleLogin };
}
