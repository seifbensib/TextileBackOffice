import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import JobSeekersView from "@/components/Tables/JobSeekersView";


export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const JobSeekers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Job Seekers" />

      <div className="flex flex-col gap-10">
  
        <JobSeekersView />
      </div>
    </DefaultLayout>
  );
};

export default JobSeekers;
