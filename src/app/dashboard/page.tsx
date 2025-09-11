import PageContent from "@/features/PageContent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "user dashboard",
  description: "Login user dshboard",
  category: "dashboard",
  keywords: "dashboard, user",
};
export default function Page() {
  return (
    <PageContent title="داشبورد">
      <p>سلام</p>
    </PageContent>
  );
}
