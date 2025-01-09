import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded text-white">
            Cancel
          </button>
          <button onClick={onDelete} className="bg-red-500 px-4 py-2 rounded text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
