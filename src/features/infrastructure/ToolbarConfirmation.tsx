import React from "react";

function ToolbarConfirmation({
  deleteItemId,
  deleteHandeler,
  setShowToolbar,
  text,
  buttons,
}: {
  deleteItemId: string | number;
  deleteHandeler: Function;
  setShowToolbar: Function;
  text: string;
  buttons: string[];
}) {
  return (
    <div className="p-2 space-y-1">
      <p>{text} </p>
      <button
        className="rounded-md bg-red-500 px-2 py-0.5 mx-0.5 cursor-pointer"
        onClick={() => deleteHandeler(deleteItemId)}
      >
        {buttons[0]}
      </button>
      <button
        className="cursor-pointer px-2"
        onClick={(e) => {
          e.preventDefault();
          setShowToolbar(false);
        }}
      >
        {buttons[1]}
      </button>
    </div>
  );
}

export default ToolbarConfirmation;
