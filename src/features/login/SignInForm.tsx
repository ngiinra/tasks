"use client";
import React, { useState } from "react";
import UserForm from "./UserForm";
import TextInputWithLabel from "../infrastructure/inputs/TextInputWithLabel";
import PrimaryButton from "../infrastructure/buttons/PrimaryButton";
const sizes = ["md:w-1/3 w-full", "md:w-2/3 w-full"];
function SignInForm() {
  const [signin, setSignin] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
  });
  return (
    <UserForm title="ثبت نام" width="w-xl">
      <TextInputWithLabel
        label="نام"
        sizes={sizes}
        value={signin.fname}
        setterFn={(val: string) => setSignin((pre) => ({ ...pre, fname: val }))}
      />
      <TextInputWithLabel
        label="نام خانوادگی"
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
        label="نام کاربری"
        sizes={sizes}
        value={signin.username}
        setterFn={(val: string) =>
          setSignin((pre) => ({ ...pre, username: val }))
        }
      />
      <TextInputWithLabel
        label="پسورد"
        sizes={sizes}
        value={signin.password}
        setterFn={(val: string) =>
          setSignin((pre) => ({ ...pre, password: val }))
        }
      />
      <TextInputWithLabel
        label="تکرار پسورد"
        sizes={sizes}
        value={signin.rePassword}
        setterFn={(val: string) =>
          setSignin((pre) => ({ ...pre, rePassword: val }))
        }
      />
      <PrimaryButton
        text="ورود"
        isLoading={false}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
        }}
        extraClass="w-full md:w-2/3 mx-auto md:mx-0 md:mr-auto"
      />
    </UserForm>
  );
}

export default SignInForm;
