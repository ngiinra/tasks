"use client";
import useTheme from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { IoCloseOutline } from "react-icons/io5";

export default function MultiSelect({
  list,
  setterFn,
}: {
  list: { text: string; value: string }[];
  setterFn: Function;
}) {
  const ui = useTheme();
  const [isListDisplayed, setIsListDisplayed] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const selectedTexts = selectedValues
    .map((item) => list.find((option) => option.value === item)?.text)
    .join(" | ");

  useEffect(() => {
    setterFn(
      selectedValues
        .map((item) => list.find((option) => option.value === item)?.text)
        .join(",")
    );
  }, [selectedValues]);

  return (
    <div>
      <ItemsList
        isDisplaying={isListDisplayed}
        setDisplaying={setIsListDisplayed}
        options={list}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
      <div className="relative">
        <input
          type="text"
          className={`px-3 py-2 border-1 ${ui.mainBorder} rounded-lg w-full outline-0 shadow-xs ${ui.inputBg}`}
          value={selectedTexts}
          disabled
        />
        <button
          className={`absolute left-0 px-3 rounded-md h-full border-1 ${ui.mainBorder} opacity-90 cursor-pointer`}
          onClick={(e) => {
            e.preventDefault();
            setIsListDisplayed(true);
          }}
        >
          انتخاب
        </button>
      </div>
    </div>
  );
}

function ItemsList({
  isDisplaying,
  setDisplaying,
  options,
  selectedValues,
  setSelectedValues,
}: {
  isDisplaying: boolean;
  setDisplaying: Function;
  options: { text: string; value: string }[];
  selectedValues: string[];
  setSelectedValues: Function;
}) {
  const ui = useTheme();
  const [searchText, setSearchText] = useState<string>("");
  const [searchedList, setSearchedList] = useState(options);

  const isAllSelected = selectedValues.length === options.length;

  const toggleSelectAll = () => {
    setSelectedValues(isAllSelected ? [] : options.map((opt) => opt.value));
  };

  const toggleSingle = (value: string) => {
    setSelectedValues((prev: string[]) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchedList(options);
    } else {
      const items = options.filter((op) => op.text.includes(searchText.trim()));
      setSearchedList(items);
    }
  }, [searchText, options]);
  return (
    <div
      className={`fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.8)] transition-opacity duration-300 ${
        isDisplaying
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`transition-all duration-300 transform ${
          isDisplaying ? "scale-100 opacity-100" : "scale-80 opacity-0"
        } ${ui.pageBg} z-20 border-1 ${
          ui.deviderBorder
        } rounded-lg shadow-2xl p-3 w-[80%] md:w-[30rem] h-[80%] md:h-[30rem]`}
      >
        <div className="flex items-center justify-between border-b-1 py-2">
          <p>انتخاب موارد</p>
          <IoCloseOutline
            className="size-7 cursor-pointer"
            onClick={() => {
              setSearchText("");
              setDisplaying(false);
            }}
          />
        </div>
        <div className="p-1">
          <TextInput
            value={searchText}
            setterFn={(val: string) => setSearchText(val)}
            placeHolder="جستجو"
          />
          <div className="p-1">
            <div
              className={`flex justify-start items-center gap-2 border-b-1 py-1`}
            >
              <input
                type="checkbox"
                name="all"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
              <label htmlFor="all">انتخاب همه</label>
            </div>
            <div className="overflow-y-auto h-80">
              {searchedList.length === 0 ? (
                <div className="text-center py-2">موردی یافت نشد</div>
              ) : (
                searchedList.map((option) => (
                  <div
                    className={`flex justify-start items-center gap-2 border-b-1 py-1 ${ui.mainBorder}`}
                    key={option.value}
                  >
                    <input
                      type="checkbox"
                      name={option.value}
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={() => toggleSingle(option.value)}
                    />
                    <label htmlFor={option.value}> {option.text} </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
