"use client";
import React, { useState } from "react"; // Import useState for form handling
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import InputGroup from "@/components/FormElements/InputGroup";



const AddOrder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("processing");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [error, setError] = useState(""); // State for error handling
  const [success, setSuccess] = useState(""); // State for success message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const orderData = {
      firstName,
      lastName,
      email,
      product,
      quantity,
      status,
      orderDate,
      deliveryDate,
    };
  
    try {
      const response = await fetch("http://localhost:3020/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${errorMessage}`);
      }
  
      const result = await response.json();
      setSuccess("Order added successfully!"); // Set success message
      alert("Order added successfully!"); // Display alert message
      console.log("Order added:", result);
  
      // Optionally, reset the form fields here
      setFirstName("");
      setLastName("");
      setEmail("");
      setProduct("");
      setQuantity(1);
      setStatus("processing");
      setOrderDate("");
      setDeliveryDate("");
    } catch (error: unknown) {
      const errorMessage = (error as Error).message; // Assert error to be of type Error
      setError(errorMessage); // Set error message
      console.error("Error adding order:", errorMessage);
    }
  };
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Order" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl w-full">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">Order Info</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="First Name"
                    type="text"
                    placeholder="Enter client first name"
                    customClasses="w-full xl:w-1/2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />

                  <InputGroup
                    label="Last Name"
                    type="text"
                    placeholder="Enter client last name"
                    customClasses="w-full xl:w-1/2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Enter client email address"
                  customClasses="mb-4.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <InputGroup
                  label="Product"
                  type="text"
                  placeholder="Enter product name"
                  customClasses="mb-4.5"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  required
                />

                <InputGroup
                  label="Quantity"
                  type="number"
                  placeholder="Enter quantity"
                  customClasses="mb-4.5"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />

                <div className="mb-4.5">
                  <label className="block text-body-sm font-medium text-dark dark:text-white">
                    Status
                  </label>
                  <select
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-2 text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <InputGroup
                  label="Order Date"
                  type="date"
                  placeholder="Select order date"
                  customClasses="mb-4.5"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  required
                />

                <InputGroup
                  label="Delivery Date"
                  type="date"
                  placeholder="Select delivery date"
                  customClasses="mb-4.5"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />

                {<SelectGroupOne />}

                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                {success && <p className="text-green-500">{success}</p>} {/* Display success message */}

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
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

export default AddOrder;
