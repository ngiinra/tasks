import SettingPage from "@/features/setting/SettingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal setting",
  description:
    "Personal setting such as font, theme and etc. user can change theme and see afects on website.",
  category: "setting",
  keywords: "setting, font, theme, password, language",
};

function page() {
  return <SettingPage />;
}

export default page;
