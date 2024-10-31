"use client";

import { Claim } from "@/types/claim";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const ClaimsView = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});
  const [userDetails, setUserDetails] = useState<{ [key: string]: { username: string; email: string } }>({});

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch("http://localhost:3020/claims");
        if (!response.ok) {
          throw new Error("Failed to fetch claims");
        }
        const data: Claim[] = await response.json();
        console.log("Fetched Claims:", data);
        setClaims(data);

        // Fetch user details for each claim's employee
        const userPromises = data.map(claim => {
          const employeeId = typeof claim.employee === 'string' ? claim.employee : claim.employee?._id;
          return employeeId ? fetchUserDetails(employeeId) : Promise.resolve();
        });
        await Promise.all(userPromises);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);

  const fetchUserDetails = async (employeeId: string) => {
    try {
      const response = await fetch(`http://localhost:3020/users/employee/${employeeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch employee details");
      }
      const userData = await response.json();
      console.log("Fetched User Data:", userData);
      setUserDetails(prev => ({
        ...prev,
        [employeeId]: { username: userData.username, email: userData.email },
      }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleCheckboxChange = async (index: number, claimId: string) => {
    const newReadStatus = !attendance[index];
    console.log(`Claim ID: ${claimId}, New Read Status: ${newReadStatus}`);
  
    try {
      const response = await fetch(`http://localhost:3020/claims/${claimId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: newReadStatus }),
      });
  
      console.log(`Response Status: ${response.status}`);
  
      if (!response.ok) {
        throw new Error("Failed to update claim read status");
      }
  
      // Update the attendance state to reflect the new read status
      setAttendance(prev => ({ ...prev, [index]: newReadStatus }));
  
      // Alert the user after a successful update
      alert(`Claim status updated to ${newReadStatus ? "read" : "unread"}.`);
    } catch (error) {
      console.error('Error updating claim read status:', error);
    }
  };
  
  
  

  const handleDeleteClaim = async (claimId: string) => {
    try {
      const response = await fetch(`http://localhost:3020/claims/${claimId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete claim');
      }
      // Update state to remove the deleted claim
      setClaims(prevClaims => prevClaims.filter(claim => claim._id !== claimId));
    } catch (error) {
      console.error('Error deleting claim:', error);
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">Username</th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">Email</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Content</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Status</th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => {
              const employeeId = typeof claim.employee === 'string' ? claim.employee : claim.employee?._id;
              const user = userDetails[employeeId];

              return (
                <tr key={claim._id}>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                    <h5 className="text-dark dark:text-white">{user ? user.username : "Loading..."}</h5>
                  </td>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                    <p className="text-dark dark:text-white">{user ? user.email : "Loading..."}</p>
                  </td>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                    <p className="text-dark dark:text-white">{claim.description}</p>
                  </td>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={attendance[index] ?? false}
                          onChange={() => handleCheckboxChange(index, claim._id)} // Pass claim ID for status update
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-body-sm font-medium">Seen</span>
                      </label>
                    </div>
                  </td>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5">
                    <div className="flex items-center justify-end space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleDeleteClaim(claim._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimsView;
