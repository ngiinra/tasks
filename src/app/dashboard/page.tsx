import PageContent from "@/features/PageContent";
import { Metadata } from "next";
import DashboardPage from "@/features/dashboard/DashboardPage";
export const metadata: Metadata = {
  title: "user dashboard",
  description: "Login user dshboard",
  category: "dashboard",
  keywords: "dashboard, user",
};
export default function Page() {
  return (
    <PageContent title="داشبورد">
      <DashboardPage />
    </PageContent>
  );
}
