import React from "react";

function UserForm({
  title,
  children,
  width,
}: {
  title: string;
  children: React.ReactNode;
  width: string;
}) {
  return (
    <div
      className={`p-10 rounded-md bg-[rgba(255,255,255,0.2)]  text-black m-2 shadow-md ${width}`}
    >
      <h1 className="font-bold p-3 mb-6 border-b-1">{title}</h1>
      <div className="flex flex-col gap-y-2">{children}</div>
    </div>
  );
}

export default UserForm;
