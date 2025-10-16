"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Toolbar from "../infrastructure/Toolbar";
import useTheme from "@/hooks/useTheme";
import { usePathname } from "next/navigation";

function NavbarItem({
  title,
  Icon,
  href,
}: {
  title: string;
  Icon: React.ElementType;
  href: string;
}) {
  const ref = useRef(null);
  const [showText, setShowingText] = useState(false);
  const ui = useTheme();
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <Link
      href={href}
      ref={ref}
      onMouseEnter={() => setShowingText(true)}
      onMouseLeave={() => setShowingText(false)}
      className={`relative ${isActive ? ui.navbarActive : ui.navbarItem}`}
    >
      <Icon className="size-8" />
      <Toolbar showText={showText}>{title}</Toolbar>
    </Link>
  );
}

export default NavbarItem;
