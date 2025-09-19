"use client";
import useTheme from "@/hooks/useTheme";

export default function Toolbar({
  children,
  showText,
  place = "right-[100%] bottom-[10%]",
}: {
  children: React.ReactNode;
  showText: boolean;
  place?: string;
}) {
  const ui = useTheme();
  return (
    <div
      className={`px-3 py-2 text-center absolute z-20 ${place} ${
        showText ? "opacity-100 visible" : "opacity-0 invisible"
      } duration-300 transition-all text-xs shadow-md ${ui.toolbarBg} ${
        ui.toolbarText
      } rounded-lg whitespace-nowrap overflow-hidden text-ellipsis truncate`}
    >
      {children}
    </div>
  );
}
