import React, { useState, useEffect } from "react";

const EditProductModal = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState(product || {});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData); // Pass updated product data to the parent component
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <div className="space-y-2">
          {["name", "price", "description", "category", "quantity", "rating"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Update ${field}`}
              className="w-full border px-3 py-2 rounded"
            />
          ))}
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Update Image URL"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded text-white">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-green-500 px-4 py-2 rounded text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
