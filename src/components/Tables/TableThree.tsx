"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the icons

interface Employee {
  _id: string;
  username: string;
  email: string;
}

const TableThree = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

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
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete employee: ${errorMessage}`);
      }

      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
      alert("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

  // Handle the edit button click
  const handleEdit = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
  };

  // Update employee function
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentEmployee) return;

    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3020/users/update/${currentEmployee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(currentEmployee), // Use the updated employee data
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update employee: ${errorMessage}`);
      }

      // Update the state with the new employee data
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === currentEmployee._id ? currentEmployee : employee
        )
      );

      alert("Employee updated successfully.");
      setIsEditing(false);
      setCurrentEmployee(null); // Reset the current employee
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
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
                    <button
                      className="hover:text-primary"
                      onClick={() => handleEdit(employee)} // Attach edit handler
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleDelete(employee._id)} // Attach delete handler
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Form */}
        {isEditing && currentEmployee && (
          <div className="mt-4 rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <h3 className="font-semibold text-dark dark:text-white">Edit Employee</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  value={currentEmployee.username}
                  onChange={(e) =>
                    setCurrentEmployee((prev) => ({ ...prev!, username: e.target.value }))
                  }
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-2 text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={currentEmployee.email}
                  onChange={(e) =>
                    setCurrentEmployee((prev) => ({ ...prev!, email: e.target.value }))
                  }
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-2 text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[10px] font-medium text-white hover:bg-opacity-90"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableThree;
