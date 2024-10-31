"use client"
import React, { useState } from "react";

interface Package {
  name: string;
  email: string;
}

const packageData: Package[] = [
  {
    name: "FOULEN BEN FOULEN",
    email: "foulenbenfoulen@gmail.com",
  },
  // Add more employee data here
];

const TableThree = () => {
  // Initialize state to manage attendance for each employee on each day
  const [attendance, setAttendance] = useState<{ [employeeIndex: number]: { [day: number]: boolean } }>({});

  const handleCheckboxChange = (employeeIndex: number, day: number) => {
    setAttendance((prev) => ({
      ...prev,
      [employeeIndex]: {
        ...prev[employeeIndex],
        [day]: !prev[employeeIndex]?.[day],
      },
    }));
  };

  // Generate an array of days (1-31) for the calendar header
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      {/* Display the current month and year */}
      <h2 className="text-lg font-bold text-dark dark:text-white mb-4 text-center">
        {currentMonth} {currentYear} Attendance
      </h2>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Employees
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Email
              </th>
              {daysInMonth.map((day) => (
                <th key={day} className="px-2 py-2 text-center font-medium text-dark dark:text-white">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packageData.map((employee, employeeIndex) => (
              <tr key={employeeIndex}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${
                    employeeIndex === packageData.length - 1 ? "border-b-0" : "border-b"
                  }`}
                >
                  <h5 className="text-dark dark:text-white">
                    {employee.name}
                  </h5>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${
                    employeeIndex === packageData.length - 1 ? "border-b-0" : "border-b"
                  }`}
                >
                  <p className="text-dark dark:text-white">
                    {employee.email}
                  </p>
                </td>
                {daysInMonth.map((day) => (
                  <td
                    key={day}
                    className={`border-[#eee] px-2 py-2 text-center dark:border-dark-3 ${
                      employeeIndex === packageData.length - 1 ? "border-b-0" : "border-b"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={attendance[employeeIndex]?.[day] ?? false}
                      onChange={() => handleCheckboxChange(employeeIndex, day)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
