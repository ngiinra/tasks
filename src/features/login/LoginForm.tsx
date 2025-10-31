"use client";
import { useState } from "react";
import TextInputWithLabel from "../infrastructure/inputs/TextInputWithLabel";
import PrimaryButton from "../infrastructure/buttons/PrimaryButton";
import { LoginType } from "@/types/UserTypes";
import { useGetLoginUserMutation } from "@/services/users/userDataApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/UserSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserForm from "./UserForm";

function LoginForm() {
  const router = useRouter();
  const [login, setLogin] = useState<LoginType>({ username: "", password: "" });
  const [useGetLoginUser, { isLoading }] = useGetLoginUserMutation();
  const dispatch = useDispatch();
  async function handleLogin() {
    if (!!login.password.trim() && !!login.username.trim()) {
      try {
        const res = await useGetLoginUser(login).unwrap();
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

  return (
    <UserForm title="ورود" width="w-xl">
      <TextInputWithLabel
        label="نام کاربری:"
        sizes={["md:w-1/3 w-full", "md:w-2/3 w-full"]}
        value={login.username}
        setterFn={(val: string) =>
          setLogin((pre) => ({ ...pre, username: val }))
        }
      />
      <TextInputWithLabel
        label="کلمه عبور:"
        sizes={["md:w-1/3 w-full", "md:w-2/3 w-full"]}
        value={login.password}
        setterFn={(val: string) =>
          setLogin((pre) => ({ ...pre, password: val }))
        }
      />
      <PrimaryButton
        text="ورود"
        isLoading={isLoading}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          handleLogin();
        }}
        extraClass="w-full md:w-2/3 mx-auto md:mx-0 md:mr-auto mt-5"
      />
    </UserForm>
  );
}

export default LoginForm;
