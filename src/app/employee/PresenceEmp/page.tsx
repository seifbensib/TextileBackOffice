import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AttendanceTable from "@/components/Tables/AttandanceTableEmp";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const Presnece = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Attendance" />

      <div className="flex flex-col gap-10">
    
        <AttendanceTable />
      </div>
    </DefaultLayout>
  );
};

export default Presnece;
