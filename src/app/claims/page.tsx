// page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ClaimsView from "@/components/Tables/ClaimsViewEmp";
import useLocalStorage from "@/hooks/useLocalStorage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import styles from './Claims.module.css';

const Claims = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateFiled: "",
    employee: "",
    read: false,
  });
  interface Claim {
    title: string;
    description: string;
    dateFiled: string;
    employee: string;
    read: boolean;
  }
  
  const [claims, setClaims] = useState<Claim[]>([]);
  const [token] = useLocalStorage<string | null>("token", null);

  useEffect(() => {
    const fetchEmployeeId = async () => {
      if (token) {
        const decoded = jwtDecode<JwtPayload & { email: string }>(token);
        const email = decoded?.email || "";
        const userResponse = await fetch(`http://localhost:3020/users/employeebyemail/${email}`);
        const userData = await userResponse.json();
        const userId = userData._id;
        setFormData((prevData) => ({ ...prevData, employee: userId }));
      }
    };

    const fetchClaims = async () => {
      if (token) {
        const decoded = jwtDecode<JwtPayload & { email: string }>(token);
        const email = decoded?.email || "";
        const userResponse = await fetch(`http://localhost:3020/users/employeebyemail/${email}`);
        const userData = await userResponse.json();
        const userId = userData._id;
        const claimsResponse = await fetch(`http://localhost:3020/claims/employee/${userId}`);
        const claimsData = await claimsResponse.json();
        setClaims(Array.isArray(claimsData) ? claimsData : []);
      }
    };

    fetchEmployeeId();
    fetchClaims();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3020/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newClaim = await response.json();
        setClaims((prevClaims) => [...prevClaims, newClaim]);
        alert("Claim added successfully!");
        setShowForm(false);
      } else {
        alert("Failed to add claim.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the claim.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Claims" />

      <div className={styles.container}>
        <button className={styles.toggleButton} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Claim"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h3 className={styles.formTitle}>Add New Claim</h3>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="dateFiled" className={styles.label}>Date Filed</label>
              <input type="datetime-local" name="dateFiled" value={formData.dateFiled} onChange={handleInputChange} className={styles.input} required />
            </div>
            
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        )}

        <ClaimsView claims={claims} />
      </div>
    </DefaultLayout>
  );
};

export default Claims;
