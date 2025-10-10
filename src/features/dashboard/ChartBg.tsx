import React from "react";

function ChartBg({
  children,
  bgColor,
  title,
}: {
  children: React.ReactNode;
  bgColor: string;
  title?: string;
}) {
  return (
    <div className="m-1">
      <h4 className="text-2xl">{title}</h4>
      <div className={`rounded-lg border-1 py-2 px-3 w-full`}>{children}</div>
    </div>
  );
}

export default ChartBg;
