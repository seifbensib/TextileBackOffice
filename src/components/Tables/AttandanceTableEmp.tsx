"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface Package {
  employeeName: string;
  employeeEmail: string;
  days: boolean[];
}

const TableThree = () => {
  const [attendanceData, setAttendanceData] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decoded = jwtDecode<JwtPayload & { email: string }>(token);
        const email = decoded.email;
        if (!email) throw new Error("No email found in token");

        const response = await axios.get(`http://localhost:3020/attendance/employee/${email}`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleCheckboxChange = (employeeIndex: number, day: number) => {
    setAttendanceData((prev) => {
      const newData = [...prev];
      newData[employeeIndex].days[day] = !newData[employeeIndex].days[day];
      return newData;
    });
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <h2 className="text-lg font-bold text-dark dark:text-white mb-4 text-center">
        {currentMonth} {currentYear} Attendance
      </h2>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Employee Name
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
            {attendanceData.map((employee, employeeIndex) => (
              <tr key={employeeIndex}>
                <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${employeeIndex === attendanceData.length - 1 ? "border-b-0" : "border-b"}`}>
                  <h5 className="text-dark dark:text-white">{employee.employeeName}</h5>
                </td>
                <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${employeeIndex === attendanceData.length - 1 ? "border-b-0" : "border-b"}`}>
                  <p className="text-dark dark:text-white">{employee.employeeEmail}</p>
                </td>
                {daysInMonth.map((day) => (
                  <td key={day} className={`border-[#eee] px-2 py-2 text-center dark:border-dark-3 ${employeeIndex === attendanceData.length - 1 ? "border-b-0" : "border-b"}`}>
                    <input
                      type="checkbox"
                      checked={employee.days[day - 1]}
                      onChange={() => handleCheckboxChange(employeeIndex, day - 1)}
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