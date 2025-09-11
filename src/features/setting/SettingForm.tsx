"use client";
import React, { useEffect, useState } from "react";
import TextInputWithLabel from "../TextInputWithLabel";
import ButtonsContainer from "../ButtonsContainer";
import PrimaryButton from "../PrimaryButton";
import Devider from "../Devider";
import SelectInputWithLabel from "../SelectInputWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { theme, languages } from "@/slices/SettingSlice";
import { useGetFontsQuery } from "@/services/fontsApi";
import { RootState } from "../../../store";
import { useUpdateUserSettingMutation } from "@/services/users/userSettingApi";
import { UserType } from "@/types/UserTypes";
import { changeSetting } from "@/slices/UserSlice";
import BeatLoading from "../loader/BeatLoading";

const sizes = ["w-full md:w-xs md:text-left", "w-full md:w-[60%]"];
function SettingForm() {
  const {
    data: fonts,
    isSuccess: fontsSuccess,
    isLoading: fontsLoading,
  } = useGetFontsQuery();
  const dispatch = useDispatch();
  const defaultSetting = useSelector((store: RootState) => store.User);
  const defaultSettingData = defaultSetting as UserType;
  const [updateUserSetting, { isLoading }] = useUpdateUserSettingMutation();
  const [selectedData, setSelectedData] = useState({
    theme: "",
    font: "",
    language: "",
    prePassword: "",
    newPassword: "",
    repeatedNewPassword: "",
  });
  useEffect(() => {
    if (defaultSettingData) {
      console.log(defaultSettingData);
      setSelectedData({
        theme: defaultSettingData.theme.trim(),
        font: defaultSettingData.font.trim(),
        language: defaultSettingData.language.trim(),
        prePassword: "",
        newPassword: "",
        repeatedNewPassword: "",
      });
    }
  }, [defaultSettingData]);

  async function handleSubmit(e: MouseEvent) {
    e.preventDefault();
    // اعتبارسنجی رمز عبور جدید
    if (
      selectedData.newPassword &&
      selectedData.newPassword !== selectedData.repeatedNewPassword
    ) {
      alert("رمز جدید با تکرار آن مطابقت ندارد");
      return;
    }
    // ارسال تنظیمات به سرور
    try {
      await updateUserSetting({
        userId: defaultSettingData.userId,
        setting: {
          theme: selectedData.theme.trim(),
          font: selectedData.font.trim(),
          language: selectedData.language.trim(),
          // اگر رمز عبور هم بخوای بفرستی، باید API رو تغییر بدی
        },
      });

      // آپدیت استیت محلی
      dispatch(changeSetting(selectedData));
    } catch (err) {
      console.error("خطا در آپدیت تنظیمات:", err);
    }
  }
  return (
    <form className={`space-y-2 bg-inherit`}>
      <SelectInputWithLabel
        label="تم:"
        sizes={sizes}
        options={theme}
        defaultValue={selectedData.theme}
        setValue={(val: string) =>
          setSelectedData((pre) => ({ ...pre, theme: val }))
        }
      />
      {fontsLoading ? (
        <BeatLoading />
      ) : (
        fonts &&
        fontsSuccess && (
          <SelectInputWithLabel
            label="فونت:"
            sizes={sizes}
            options={fonts}
            defaultValue={selectedData.font}
            setValue={(val: string) =>
              setSelectedData((pre) => ({ ...pre, font: val }))
            }
          />
        )
      )}
      <SelectInputWithLabel
        label="زبان:"
        sizes={sizes}
        options={languages}
        defaultValue={selectedData.language}
        setValue={(val: string) =>
          setSelectedData((pre) => ({ ...pre, language: val }))
        }
      />
      <Devider title="تغییر رمز" />
      <TextInputWithLabel
        label="رمز عبور قدیمی"
        sizes={sizes}
        value={selectedData.prePassword}
        setterFn={(val: string) =>
          setSelectedData((pre) => ({ ...pre, prePassword: val }))
        }
      />
      <TextInputWithLabel
        label="رمز عبور جدید"
        sizes={sizes}
        value={selectedData.newPassword}
        setterFn={(val: string) =>
          setSelectedData((pre) => ({ ...pre, newPassword: val }))
        }
      />
      <TextInputWithLabel
        label="تکرار رمز عبور جدید"
        sizes={sizes}
        value={selectedData.repeatedNewPassword}
        setterFn={(val: string) =>
          setSelectedData((pre) => ({ ...pre, repeatedNewPassword: val }))
        }
      />
      <ButtonsContainer>
        <PrimaryButton
          text="اعمال"
          onClick={handleSubmit}
          extraClass="w-50"
          isLoading={isLoading}
        />
      </ButtonsContainer>
    </form>
  );
}

export default SettingForm;
