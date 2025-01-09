import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';


const EditUserModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Check if the user object has an _id before saving
    if (!formData._id) {
      console.error('Error: _id is missing');
      alert('Error: Cannot save changes. User ID is missing.');
      return;
    }

    // Call the onSave function passed as a prop
    onSave(formData);
    
    // Show a toast notification for a successful save
    toast.success("User updated successfully!", {
      // position: "top-right",
      autoClose: 3000,
    });

    // Close the modal after saving
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
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

export default EditUserModal;
