function ButtonsContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-2 items-center">{children}</div>;
}

export default ButtonsContainer;
