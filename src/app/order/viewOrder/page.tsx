"use client"; // Mark this component as a Client Component

import React, { useEffect, useState } from "react"; // Import useEffect and useState
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import OrderTable from "@/components/Tables/Order";
import { Order } from "@/types/order"; // Import Order type

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Specify Order type
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3020/orders");

        if (!response.ok) {
          throw new Error(`Error fetching orders: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data); // Set the fetched orders
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred."); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchOrders(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  const handleDelete = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:3020/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting order: ${response.statusText}`);
      }

      // Update state to remove the deleted order
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred."); // Set error message
    }
  };

  const handleUpdate = async (updatedOrder: Order) => {
    try {
      const response = await fetch(`http://localhost:3020/orders/${updatedOrder._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error(`Error updating order: ${response.statusText}`);
      }

      // Update state with the updated order
      setOrders((prevOrders) => 
        prevOrders.map(order => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred."); // Set error message
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
        {loading && <p>Loading orders...</p>} {/* Show loading message */}
        {error && <p className="text-red-500">{error}</p>} {/* Show error message */}
        {!loading && !error && 
          <OrderTable 
            orders={orders} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate} // Pass the update function to OrderTable
          /> 
        }
      </div>
    </DefaultLayout>
  );
};

export default Orders;
