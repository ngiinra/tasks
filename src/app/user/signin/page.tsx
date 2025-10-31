import SignInForm from "@/features/login/SignInForm";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function page() {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-[url('/loginMob.svg')] md:bg-[url('/login.svg')] bg-no-repeat bg-center md:bg-cover">
      <Link
        href={"/user/login"}
        className="flex items-center gap-2 absolute top-[15%] right-[15%] text-white"
      >
        <FaArrowRightLong />{" "}
        <span className="border-b-1 hover:text-blue-300">ورود؟</span>
      </Link>
      <SignInForm />
    </div>
  );
}

export default page;
