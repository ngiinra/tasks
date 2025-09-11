import React from "react";

function Navbar({
  children,
  extraClass
}: {
  children: React.ReactNode;
  extraClass?: string;
}) {
  return (
    <div
      className={`fixed ${extraClass?extraClass: "z-10 w-15 right-0"} shadow-lg h-screen mt-0 p-2 flex flex-col items-center justify-center gap-5 border-l `}
    >
      {children}
    </div>
  );
}

export default Navbar;
