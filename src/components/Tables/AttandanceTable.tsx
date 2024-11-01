"use client"; // Make sure this is at the top

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Define your interfaces
interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  address:string;
}

interface Attendance {
  _id:string;
  employee: Employee;
  employeeEmail :string;
  days: boolean[];
  changedDays?: { [key: number]: boolean };
}

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  // Fetch attendance data from the API
  useEffect(() => {
    const fetchAttendanceData = async () => {
        try {
          const token = sessionStorage.getItem("token") || localStorage.getItem("token");
          const response = await fetch("http://localhost:3020/attendance", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token ? JSON.parse(token) : ''}`,
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch attendance data");
          }
      
          const data = await response.json();
          console.log("Fetched Attendance Data:", data); // Log the data here
          setAttendanceData(data);
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
      const updatedData = prev.map((attendance, index) => {
        if (index === employeeIndex) {
          const updatedDays = [...attendance.days];
          updatedDays[day] = !updatedDays[day];
          return { ...attendance, days: updatedDays, changedDays: { ...attendance.changedDays, [day]: updatedDays[day] } };
        }
        return attendance;
      });
      return updatedData;
    });
  };
  
  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  
    try {
      for (const attendance of attendanceData) {
        for (const [day, isPresent] of Object.entries(attendance.changedDays || {})) {
          const dayIndex = parseInt(day) + 1; // Adjusting for 1-indexed day format
  
          const response = await fetch(`http://localhost:3020/attendance/${attendance._id}/day/${dayIndex}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token ? JSON.parse(token) : ''}`,
            },
            body: JSON.stringify({ present: isPresent }),
          });
  
          if (!response.ok) {
            console.error(`Failed to update day ${dayIndex} attendance for ${attendance.employee.firstName}`);
          } else {
            Swal.fire({
              title: 'Attendance Updated',
              text: 'All changes were saved successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            }
        }
      }
    } catch (error) {
      console.error("Error submitting attendance updates:", error);
    }
  };
  
  // Generate an array of days (1-31) for the calendar header
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  if (loading) {
    return <div>Loading attendance data...</div>; // Loading state
  }

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
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Emails
              </th>
              
              {daysInMonth.map((day) => (
                <th key={day} className="px-2 py-2 text-center font-medium text-dark dark:text-white">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {attendanceData.map((attendance, employeeIndex) => (
    <tr key={attendance.employee._id}>
      <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
        {attendance.employee.firstName} {attendance.employee.lastName}
       
      </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
            {attendance.employeeEmail}      
            </td>


      {attendance.days.map((day, dayIndex) => (
        <td key={dayIndex} className="border-[#eee] px-2 py-2 text-center dark:border-dark-3">
          <input
            type="checkbox"
            checked={day}
            onChange={() => handleCheckboxChange(employeeIndex, dayIndex)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>

        </table>
      </div>
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-600 text-white rounded">
        Save Changes
      </button>
    </div>
  );
};

export default AttendanceTable;
