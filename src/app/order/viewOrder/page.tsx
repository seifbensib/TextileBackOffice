import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import OrderTable from "@/components/Tables/Order";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const Orders = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
    
        <OrderTable />
      </div>
    </DefaultLayout>
  );
};

export default Orders;
