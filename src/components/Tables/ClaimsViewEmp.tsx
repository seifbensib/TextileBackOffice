// claimsview.tsx
import { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import styles from './ClaimsView.module.css';

interface Claim {
  title: string;
  description: string;
  dateFiled: string;
  read: boolean;
}

const ClaimsView = ({ claims }: { claims: Claim[] }) => {
  const [token] = useLocalStorage<string | null>("token", null);

  const handleCheckboxChange = (index: number) => {
    // Logic for handling checkbox change
  };

  return (
    <div className={styles.claimsContainer}>
      <table className={styles.claimsTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date Filed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim, index) => (
            <tr key={index}>
              <td>{claim.title}</td>
              <td>{claim.description}</td>
              <td>{new Date(claim.dateFiled).toLocaleDateString()}</td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={claim.read}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span>Read</span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsView;
