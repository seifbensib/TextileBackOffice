"use client";
import { Order } from "@/types/order";
import { useState } from "react"; // Import useState to manage checkbox states



const packageData: Order[] = [
  {
      code: "20021325",
      name: "foulen ben foulen",
      email: "foulen@benfoulen.com",
      product: "textile",
      quantity:50,
      status: false
  },
];

const OrderTable = () => {
  // Initialize state to manage attendance for each employee
  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (index: number) => {
    setAttendance((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
            <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Order Code
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Client
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Emails
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Product
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Quantity
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, index) => (
              <tr key={index}>
                 <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <h5 className="text-dark dark:text-white">
                    {packageItem.code}
                  </h5>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <h5 className="text-dark dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.email}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.product}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.quantity}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={attendance[index] ?? false}
                        onChange={() => handleCheckboxChange(index)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-body-sm font-medium">Ready</span>
                    </label>
                    
                  </div>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <div className="flex items-center justify-end space-x-3.5">
                    {/* Your action buttons here */}
                    <button className="hover:text-primary">Edit</button>
                    <button className="hover:text-primary">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
