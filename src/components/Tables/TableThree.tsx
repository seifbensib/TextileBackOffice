"use client";

import { useEffect, useState } from "react"; // Import useEffect to fetch data
import { Package } from "@/types/package";

// Define a new type for the employee data fetched from the API
interface Employee {
  id: number; // Adjust the properties based on your actual API response
  name: string;
  email: string;
  // Add any other relevant properties
}

const TableThree = () => {
  // Initialize state to manage attendance for each employee and store user data
  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});
  const [employees, setEmployees] = useState<Employee[]>([]); // State to hold fetched employees

  const handleCheckboxChange = (index: number) => {
    setAttendance((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    // Fetch user data from the API
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3020/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Employees
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Emails
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Attendance
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === employees.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <h5 className="text-dark dark:text-white">
                    {employee.name}
                  </h5>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === employees.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {employee.email}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === employees.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={attendance[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">Present</span>
                    </label>
                  </div>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === employees.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <div className="flex items-center justify-end space-x-3.5">
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

export default TableThree;
