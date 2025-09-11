import { useEffect, useState } from "react";
import themeColors, { themeColorType, ThemeNames } from "@/app/theme";
import { useGetUserSettingQuery } from "@/services/users/userSettingApi";
import { SettingType } from "@/types/UserTypes";

export default function useTheme() {
  const { data, isLoading } = useGetUserSettingQuery("1");
  const savedSetting = data as SettingType;
  const [ui, setUi] = useState<themeColorType>(themeColors.etemad);

  useEffect(() => {
    if (!isLoading && savedSetting.theme) {
      const themeKey = savedSetting.theme as keyof typeof themeColors;
      if (themeKey in themeColors) {
        setUi(themeColors[themeKey]);
      }
    }
  }, [savedSetting, isLoading]);

  return ui;
}
