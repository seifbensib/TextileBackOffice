"use client";

import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  username: string;
  email: string;
}

const TableThree = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Fetching employees from the API
  useEffect(() => {
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
  }, []);

  // Delete employee function
  const handleDelete = async (id: string) => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3020/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${JSON.parse(token)}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete employee: ${errorMessage}`);
      }

      // If successful, remove the employee from state
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
      alert("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

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
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}>
                  <h5 className="text-dark dark:text-white">{employee.username}</h5>
                </td>
                <td className={`border-[#eee] px-4 py-4 dark:border-dark-3`}>
                  <p className="text-dark dark:text-white">{employee.email}</p>
                </td>
                <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5`}>
                  <div className="flex items-center justify-end space-x-3.5">
                    <button className="hover:text-primary">Edit</button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleDelete(employee._id)} // Attach delete handler
                    >
                      Delete
                    </button>
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
