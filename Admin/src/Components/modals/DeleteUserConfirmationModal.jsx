import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DeleteUserConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete(); // Call the delete function passed as a prop
      toast.success("User deleted successfully");
      onClose(); // Close the modal after successful deletion
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserConfirmationModal;
