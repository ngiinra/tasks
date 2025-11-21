"use client";
import React, { useRef, useState } from "react";
import Toolbar from "../infrastructure/Toolbar";
import useTheme from "@/hooks/useTheme";
import { usePathname } from "next/navigation";
import SmartLink from "../infrastructure/SmartLink";

function NavbarItem({
  title,
  Icon,
  href,
}: {
  title: string;
  Icon: React.ElementType;
  href: string;
}) {
  const [showText, setShowingText] = useState(false);
  const ui = useTheme();
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <SmartLink
      href={href}
      onMouseEnter={() => setShowingText(true)}
      onMouseLeave={() => setShowingText(false)}
      className={`relative ${isActive ? ui.navbarActive : ui.navbarItem}`}
    >
      <Icon className="size-8" />
      <Toolbar showText={showText}>{title}</Toolbar>
    </SmartLink>
  );
}

export default NavbarItem;
