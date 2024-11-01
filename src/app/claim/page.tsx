import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ClaimsView from "@/components/Tables/ClaimsView";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const Claims = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Claims" />

      <div className="flex flex-col gap-10">
  
        <ClaimsView />
      </div>
    </DefaultLayout>
  );
};

export default Claims;