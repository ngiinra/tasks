"use client";
import React, { useState } from "react";
import UserForm from "./UserForm";
import TextInputWithLabel from "../infrastructure/inputs/TextInputWithLabel";
import PrimaryButton from "../infrastructure/buttons/PrimaryButton";
import { useCreateUserMutation } from "@/services/users/userDataApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import useLogin from "./useLogin";
const sizes = ["md:w-1/3 w-full", "md:w-2/3 w-full"];
function SignInForm() {
  const initial = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
  };
  const [signin, setSignin] = useState(initial);
  const [useCreateUser, { isLoading }] = useCreateUserMutation();
  const { handleLogin } = useLogin(signin);
  async function onSign() {
    if (
      !!signin.fname.trim() &&
      !!signin.lname.trim() &&
      !!signin.username.trim() &&
      !!signin.password.trim() &&
      !!signin.rePassword.trim()
    ) {
      if (signin.password === signin.rePassword) {
        console.log(signin);
        try {
          await useCreateUser({
            fname: signin.fname,
            lname: signin.lname,
            phone: signin.phone,
            email: signin.email,
            username: signin.username,
            password: signin.password,
          }).unwrap();
          toast.success("با موفقیت کاربر ایجاد شد.");
          setSignin(initial);
          await handleLogin();
        } catch {
          toast.error("در ایجاد کاربر مشکلی به وجود آمده.");
        }
      } else {
        toast.error("پسورد و تکرار آن یکسان نیست");
      }
    }
  }
  return (
    <UserForm title="ثبت نام" width="w-xl">
      <TextInputWithLabel
        label="نام*"
        sizes={sizes}
        value={signin.fname}
        setterFn={(val: string) => setSignin((pre) => ({ ...pre, fname: val }))}
      />
      <TextInputWithLabel
        label="نام خانوادگی*"
        sizes={sizes}
        value={signin.lname}
        setterFn={(val: string) => setSignin((pre) => ({ ...pre, lname: val }))}
      />
      <TextInputWithLabel
        label="تلفن"
        sizes={sizes}
        value={signin.phone}
        setterFn={(val: string) => setSignin((pre) => ({ ...pre, phone: val }))}
      />
      <TextInputWithLabel
        label="ایمیل"
        sizes={sizes}
        value={signin.email}
        setterFn={(val: string) => setSignin((pre) => ({ ...pre, email: val }))}
      />
      <TextInputWithLabel
        label="نام کاربری*"
        sizes={sizes}
        value={signin.username}
        setterFn={(val: string) =>
          setSignin((pre) => ({ ...pre, username: val }))
        }
      />
      <TextInputWithLabel
        label="پسورد*"
        sizes={sizes}
        value={signin.password}
        setterFn={(val: string) =>
          setSignin((pre) => ({ ...pre, password: val }))
        }
      />
      <TextInputWithLabel
        label="تکرار پسورد*"
        sizes={sizes}
        value={signin.rePassword}
        setterFn={(val: string) =>
          setSignin((pre) => ({ ...pre, rePassword: val }))
        }
      />
      <PrimaryButton
        text="ثبت نام"
        isLoading={isLoading}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onSign();
        }}
        extraClass="w-full md:w-2/3 mx-auto md:mx-0 md:mr-auto"
        deactive={
          !signin.fname.trim() ||
          !signin.lname.trim() ||
          !signin.username.trim() ||
          !signin.password.trim() ||
          !signin.rePassword.trim()
        }
      />
    </UserForm>
  );
}

export default SignInForm;
