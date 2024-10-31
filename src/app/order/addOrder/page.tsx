import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import InputGroup from "@/components/FormElements/InputGroup";

export const metadata: Metadata = {
  title: "Next.js Form Layout Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Layout page for NextAdmin Dashboard Kit",
};

const AddOrder = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Order" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl w-full">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">Order Info</h3>
            </div>
            
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="First name"
                    type="text"
                    placeholder="Enter client first name"
                    customClasses="w-full xl:w-1/2"
                  />

                  <InputGroup
                    label="Last name"
                    type="text"
                    placeholder="Enter client last name"
                    customClasses="w-full xl:w-1/2"
                  />
                </div>

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Enter client email address"
                  customClasses="mb-4.5"
                  required
                />

             

<InputGroup
                  label="Quantity"
                  type="number"
                  placeholder="Enter  quantity"
                  customClasses="mb-4.5"
                />


                { <SelectGroupOne /> }

               {/*  <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Note</label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div> */}

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddOrder;
