import React, { useState } from 'react';
import { Order } from "@/types/order"; // Ensure you have the Order type imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the icons

interface OrderTableProps {
  orders: Order[];
  onDelete: (orderId: string) => Promise<void>;
  onUpdate: (order: Order) => Promise<void>; // Add onUpdate prop
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Handle the edit button click
  const handleEdit = (order: Order) => {
    setCurrentOrder(order);
    setIsEditing(true);
  };

  // Update order function
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentOrder) return;

    try {
      await onUpdate(currentOrder); // Call the onUpdate function with the currentOrder
      alert("Order updated successfully.");
      setIsEditing(false);
      setCurrentOrder(null); // Reset the current order
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">Order Code</th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">Client</th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">Product</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Quantity</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Status</th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}>
                    <h5 className="text-dark dark:text-white">{order.code}</h5>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}>
                    <h5 className="text-dark dark:text-white">{`${order.firstName} ${order.lastName}`}</h5>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">{order.product}</p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">{order.quantity}</p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">{order.status}</p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}>
                    <div className="flex items-center justify-end space-x-3.5">
                      <button className="hover:text-blue-500" onClick={() => handleEdit(order)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="hover:text-red-500" onClick={() => onDelete(order._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">No orders available.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit Form */}
        {isEditing && currentOrder && (
          <div className="mt-4 rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <h3 className="font-semibold text-dark dark:text-white">Edit Order</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-body-sm font-medium text-dark dark:text-white">Order Code</label>
                <input
                  type="text"
                  value={currentOrder.code}
                  onChange={(e) => setCurrentOrder((prev) => ({ ...prev!, code: e.target.value }))}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-2 text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-body-sm font-medium text-dark dark:text-white">Quantity</label>
                <input
                  type="number"
                  value={currentOrder.quantity}
                  onChange={(e) => setCurrentOrder((prev) => ({ ...prev!, quantity: parseInt(e.target.value, 10) }))}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-2 text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-body-sm font-medium text-dark dark:text-white">Status</label>
                <input
                  type="text"
                  value={currentOrder.status}
                  onChange={(e) => setCurrentOrder((prev) => ({ ...prev!, status: e.target.value }))}
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

export default OrderTable;
