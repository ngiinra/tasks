import Cookies from "js-cookie";
export async function setSettingCookie(settingObj: {
  theme: string;
  font: string;
  language: string;
}) {
  const today = new Date();
  const nextYearDate = new Date(today);
  nextYearDate.setFullYear(today.getFullYear() + 1);
  const setting = JSON.stringify(settingObj);
  Cookies.set("setting", setting, {
    expires: nextYearDate,
  });
}
