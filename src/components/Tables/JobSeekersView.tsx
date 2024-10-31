"use client";

import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JobApply } from "@/types/jobApply";

const JobSeekersView = () => {
  const [jobApplications, setJobApplications] = useState<JobApply[]>([]);
  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});
  
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await fetch("http://localhost:3020/job-apply");
        if (!response.ok) {
          throw new Error("Failed to fetch job applications");
        }
        const data: JobApply[] = await response.json();
        console.log("Fetched Job Applications:", data);
        setJobApplications(data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  const handleCheckboxChange = async (index: number, jobApplyId: string) => {
    const newStatus = !attendance[index]; // Toggle the current status
    console.log(`Updating JobApply ID: ${jobApplyId} to status: ${newStatus}`);

    try {
        const response = await fetch(`http://localhost:3020/job-apply/${jobApplyId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }), // Ensure you're updating the correct field
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to update status:", errorText);
            alert("Failed to update status");
            return;
        }

        // Update the attendance state if the response is successful
        setAttendance(prev => ({ ...prev, [index]: newStatus }));
        alert(`Status updated to ${newStatus ? "Accepted" : "Rejected"}.`);
    } catch (error) {
        console.error('Error updating status:', error);
        alert("Error updating status");
    }
};


  const handleDeleteApplication = async (applicationId: string) => {
    try {
      const response = await fetch(`http://localhost:3020/job-apply/${applicationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete job application");
      }
      // Update state to remove the deleted application
      setJobApplications((prev) => prev.filter((application) => application._id !== applicationId));
    } catch (error) {
      console.error("Error deleting job application:", error);
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">Name</th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">Email</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Motivation Letter</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Status</th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobApplications.map((application, index) => (
              <tr key={application._id}>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{application.firstName} {application.lastName}</h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                  <p className="text-dark dark:text-white">{application.email}</p>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                  <p className="text-dark dark:text-white">{application.description}</p>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={attendance[index] ?? false}
                        onChange={() => handleCheckboxChange(index, application._id)} // Pass application ID for attendance update
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-body-sm font-medium">Accepted</span>
                    </label>
                  </div>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5">
                  <div className="flex items-center justify-end space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => handleDeleteApplication(application._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
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

export default JobSeekersView;
