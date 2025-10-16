import useTheme from "@/hooks/useTheme";
import React from "react";

function PageWithTabs({
  tabsTitle,
  tabsIcons,
  setTabFunc,
  children,
  activeTab,
}: {
  tabsTitle: Array<string>;
  tabsIcons?: Array<React.ReactElement>;
  setTabFunc: Function;
  children: React.ReactNode;
  activeTab: string;
}) {
  const ui = useTheme();
  return (
    <div className={`pt-5`}>
      <div
        className={`min-h-screen lg:mx-auto max-w-6xl p-10 rounded-lg ${ui.pageBg} ${ui.pageText}`}
      >
        <div className={`mb-8 border-b-2 pb-2 flex ${ui.titleBorder}`}>
          {tabsTitle.map((title, i) => (
            <PageTab
              title={title}
              key={title}
              setTabFunc={setTabFunc}
              isActive={activeTab === title}
              icon={tabsIcons?.[i]}
            />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

export default PageWithTabs;

function PageTab({
  title,
  setTabFunc,
  isActive,
  icon,
}: {
  title: string;
  setTabFunc: Function;
  isActive: boolean;
  icon?: React.ReactElement;
}) {
  const ui = useTheme();
  return (
    <button
      className={`py-2 px-4 transition-all duration-200 flex items-center gap-2 cursor-pointer rounded-sm text-lg ${
        isActive && ui.buttonBg + " " + ui.buttonText
      }`}
      onClick={() => setTabFunc(title)}
    >
      <span>{icon}</span>
      <p>{title}</p>
    </button>
  );
}
