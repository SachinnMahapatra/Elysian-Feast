import React, { useState } from "react";

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: "user", // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData); // Notify parent to add user
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <div className="space-y-4">
          {["firstName", "lastName", "phoneNumber", "email"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full border p-2 rounded"
            />
          ))}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
