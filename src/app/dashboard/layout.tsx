import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClientWrapper from "./DasboardClientWrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user")?.value?.trim();

  if (!userId) {
    redirect("/login");
  }

  return (
    <DashboardClientWrapper userId={userId}>{children}</DashboardClientWrapper>
  );
}
