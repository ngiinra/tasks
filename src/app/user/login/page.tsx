import LoginForm from "@/features/login/LoginForm";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[url('/loginMob.svg')] md:bg-[url('/login.svg')] bg-no-repeat bg-center md:bg-cover">
      <Link
        href={"/user/signin"}
        className="flex items-center gap-2 absolute top-[15%] right-[15%] text-white"
      >
        <FaArrowRightLong />{" "}
        <span className="border-b-1 hover:text-blue-300">
          نام کاربری ندارید؟ ثبت نام کنید.
        </span>
      </Link>
      <LoginForm />
    </div>
  );
}
