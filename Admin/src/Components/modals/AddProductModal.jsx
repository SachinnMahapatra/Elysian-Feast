import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const AddProductModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    category: "",
    quantity: "",
    rating: "",
    offers: "",
    highlights: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    //(image);  // Check if the image is set correctly
  
    const { name, price, originalPrice, description, category, quantity } = formData;
  
    // Basic validation
    if (!name || !price || !originalPrice || !description || !category || !quantity) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }
  
    if (Number(price) < 1 || Number(quantity) < 1 || (formData.rating && Number(formData.rating) < 1)) {
      alert("⚠️ Price, quantity, and rating cannot be less than 1.");
      return;
    }
  
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (image) data.append("productImage", image);  // Check if this is getting appended
  
      const response = await axios.post("http://localhost:4001/product/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      onSave(response.data.newProduct);
      alert("✅ Product created successfully! 🎉");
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ An error occurred while adding the product. Please try again.");
    }
  };
  

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
        <div className="flex space-x-6">
          {/* Left Column */}
          <div className="w-1/2 space-y-4">
            {["name", "price", "originalPrice", "discount", "category", "quantity", "rating"].map((field) => (
              <div key={field}>
                <label className="block text-gray-600 font-medium mb-1 capitalize">
                  {field}
                </label>
                <input
                  type={
                    field === "price" ||
                    field === "originalPrice" ||
                    field === "discount" ||
                    field === "quantity" ||
                    field === "rating"
                      ? "number"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="w-full border text-black border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="4"
                className="w-full border text-black border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Offers</label>
              <textarea
                name="offers"
                value={formData.offers}
                onChange={handleChange}
                placeholder="Enter offers (comma-separated)"
                rows="2"
                className="w-full border text-black border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Highlights</label>
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                placeholder="Enter highlights (comma-separated)"
                rows="2"
                className="w-full border text-black border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div
              {...getRootProps()}
              className={`w-full border-dashed border-2 px-4 py-6 rounded-lg cursor-pointer flex items-center justify-center text-center ${
                isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {image ? (
                <p className="text-gray-700">{image.name}</p>
              ) : (
                <p className="text-gray-400">
                  📂 Drag & drop an image here, or click to select 🖼️
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
