// StoreProvider.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "../../store";
import FontExecutor from "./FontExecutor";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <FontExecutor>{children}</FontExecutor>
    </Provider>
  );
}
