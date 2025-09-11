"use client";
import { useGetUserSettingQuery } from "@/services/users/userSettingApi";
import { changeSetting } from "@/slices/UserSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function FontExecutor({ children }: { children: React.ReactNode }) {
  const { data, isSuccess } = useGetUserSettingQuery("1");
  const [font, setFont] = useState("font-yekan");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.font) {
      setFont(fontClass(data.font));
      dispatch(
        changeSetting({
          font: data.font,
          theme: data.theme,
          language: data.language,
        })
      );
    }
  }, [isSuccess, data?.font]);

  function fontClass(defaultFont: string) {
    switch (defaultFont) {
      case "vazir":
        return "font-vazir";
      case "yekan":
        return "font-yekan";
      case "iraniansans":
        return "font-iraniansans";
      case "lalezar":
        return "font-lalezar";
      default:
        return "font-yekan";
    }
  }

  return <div className={`${font} m-0 p-0`}>{children}</div>;
}

export default FontExecutor;
