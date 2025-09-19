"use client"; // چون در نوبار ایتم ها داریم کامپوننت های ایکون رو از این کامپوننت پاس میدیم که باید کلاینت باشه

import NavbarItem from "./NavbarItem";
import Navbar from "./Navbar";
import { RiLogoutCircleRFill, RiSettings3Fill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { SiGoogletasks } from "react-icons/si";
import useTheme from "@/hooks/useTheme";
import { CgArrangeBack } from "react-icons/cg";

function DashboardNavbar() {
  const ui = useTheme();
  return (
    <Navbar
      extraClass={`z-10 w-15 ${ui.mainBorder} ${ui.navbarBg} ${ui.pageText}`}
    >
      <NavbarItem
        Icon={TbLayoutDashboardFilled}
        title="داشبورد"
        href="/dashboard"
      />
      <NavbarItem Icon={SiGoogletasks} title="تسک ها" href="/dashboard/tasks" />
      <NavbarItem
        Icon={CgArrangeBack}
        title="تعاریف"
        href="/dashboard/definitions"
      />
      <NavbarItem
        Icon={RiSettings3Fill}
        title="تنظیمات شخصی"
        href="/dashboard/setting"
      />
      <NavbarItem
        Icon={RiLogoutCircleRFill}
        title="خروج از حساب"
        href="/dashboard/logout"
      />
    </Navbar>
  );
}

export default DashboardNavbar;
