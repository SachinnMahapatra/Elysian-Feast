import React, { useState } from "react";

const AddressDetails = () => {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Address saved successfully!");
  };

  return (
    <div className="p-6 space-y-6 max-w-md mx-auto bg-gray-50 shadow-md rounded-md">
      <h3 className="text-lg font-semibold text-center">Enter Address Details</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1"
          >
            Your Location*
          </label>
          <input
            type="text"
            id="name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your Location"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium mb-1"
          >
            Complete Address*
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="House no./Flat no./Floor/Building"
          />
        </div>
        <div>
          <label
            htmlFor="floor"
            className="block text-sm font-medium mb-1"
          >
            Floor
          </label>
          <input
            type="text"
            id="floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Optional"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-1"
          >
            How to reach
          </label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Optional"
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressDetails;
