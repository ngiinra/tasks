"use client";
import { useState } from "react";
import TextInputWithLabel from "../infrastructure/inputs/TextInputWithLabel";
import PrimaryButton from "../infrastructure/buttons/PrimaryButton";
import { LoginType } from "@/types/UserTypes";
import UserForm from "./UserForm";
import useLogin from "./useLogin";

function LoginForm() {
  const [login, setLogin] = useState<LoginType>({ username: "", password: "" });
  const { isLoading, handleLogin } = useLogin(login);

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
