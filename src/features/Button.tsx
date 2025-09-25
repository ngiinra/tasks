"use client"; //بخاطر onclick

function Button({
  text,
  onClick,
  extraClass,
  isLoading,
  deactive,
}: {
  text: string;
  onClick: Function;
  extraClass?: string;
  isLoading: boolean;
  deactive?: boolean;
}) {
  return (
    <button
      className={`px-3 py-2 text-center m-1 border-1 outline-0 shadow-md cursor-pointer rounded-lg ${extraClass} disabled:opacity-30 hover:shadow-md`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      disabled={isLoading || deactive}
    >
      {isLoading ? "لطفا شکیبا باشید" : text}
    </button>
  );
}

export default Button;
