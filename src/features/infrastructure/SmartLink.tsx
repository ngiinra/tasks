"use client";
import useTheme from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PropagateLoader } from "react-spinners";

export default function SmartLink({
  href,
  children,
  onMouseEnter,
  onMouseLeave,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onMouseEnter: Function;
  onMouseLeave: Function;
  className: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const ui = useTheme();
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            router.prefetch(href); // پیش‌بارگذاری دستی
            router.push(href);
          });
          onMouseEnter = onMouseEnter;
          onMouseLeave = onMouseLeave;
          className = `${className} cursor-pointer`;
        }}
      >
        {children}
      </button>
      {isPending && (
        <div
          className={`fixed top-0 left-0 flex items-center justify-center h-full w-full ${ui.pageBg} ${ui.pageText} z-50`}
        >
          <PropagateLoader size="20px" />
        </div>
      )}
    </>
  );
}
