import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClientWrapper from "./DasboardClientWrapper";
import DashboardNavbar from "@/features/navbar/DashboardNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user")?.value;

  if (!userId) {
    redirect("/user/login");
  }

  return (
    <DashboardClientWrapper userId={userId}>
      {" "}
      <DashboardNavbar />
      {children}
    </DashboardClientWrapper>
  );
}
