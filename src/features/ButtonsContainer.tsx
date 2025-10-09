function ButtonsContainer({
  children,
  extraClass,
}: {
  children: React.ReactNode;
  extraClass?: string;
}) {
  return (
    <div
      className={`flex justify-end gap-2 items-center flex-wrap mt-6 ${extraClass}`}
    >
      {children}
    </div>
  );
}

export default ButtonsContainer;
