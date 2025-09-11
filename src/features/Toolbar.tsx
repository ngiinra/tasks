"use client";
import useTheme from "@/hooks/useTheme";

export default function Toolbar({
  text,
  showText,
}: {
  text: string;
  showText: boolean;
}) {
  const ui = useTheme();
  return (
    <div
      className={`px-3 py-2 text-center absolute right-[100%] bottom-[10%] z-20 ${
        showText ? "opacity-100 visible" : "opacity-0 invisible"
      } duration-300 transition-all text-xs shadow-md ${ui.toolbarBg} ${
        ui.toolbarText
      } rounded-lg whitespace-nowrap overflow-hidden text-ellipsis truncate`}
    >
      <p>{text}</p>
    </div>
  );
}
