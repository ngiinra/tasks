import DefinitionsPage from "@/features/definitions/DefinitionsPage";
import PageContent from "@/features/infrastructure/page/PageContent";
import React from "react";

function page() {
  return (
    <PageContent title="مدیریت تعاریف">
      <DefinitionsPage />
    </PageContent>
  );
}

export default page;
