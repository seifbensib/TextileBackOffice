"use client";

import { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

const AddEmp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [post, setPost] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  
    const employeeData = {
      firstName,
      lastName,
      email,
      username: email.split("@")[0],
      role: "employee",
      post,
      note,
    };
  
    console.log("Employee Data before submit:", employeeData);
  
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  
      if (token) {
        console.log("Token found:", JSON.parse(token));
  
        const response = await fetch("http://localhost:3020/users/create-employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(token)}`,
          },
          body: JSON.stringify(employeeData),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to add employee: ${errorMessage}`);
        }
  
        const result = await response.json();
        console.log("Employee added successfully:", result);
        alert("Employee added successfully!"); // Notification alert
  
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add employee. Please try again.");
    }
  };
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Employee" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl w-full">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">Employee Info</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="First Name"
                    type="text"
                    placeholder="Enter your first name"
                    customClasses="w-full xl:w-1/2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <InputGroup
                    label="Last Name"
                    type="text"
                    placeholder="Enter your last name"
                    customClasses="w-full xl:w-1/2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
                  customClasses="mb-4.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputGroup
                  label="Post"
                  type="text"
                  placeholder="Enter Post"
                  customClasses="mb-4.5"
                  value={post}
                  onChange={(e) => setPost(e.target.value)} // Updated to setPost
                />

                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Note
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddEmp;
