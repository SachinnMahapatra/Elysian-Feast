import React, { useState } from "react";
import Header from "../home/Header";

const Profile = () => {
  // State for uploaded photos
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  // Function to handle photo uploads
  const handleUploadedPhoto = (photoUrl) => {
    setUploadedPhotos((prevPhotos) => [...prevPhotos, photoUrl]);
  };

  // State for active tab in bookings
  const [activeTab, setActiveTab] = useState("past");

  // Edit button functionality
  const handleEdit = () => {
    alert("Edit address functionality to be implemented!");
  };

  // Delete button functionality
  const handleDelete = (address) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the address: "${address}"?`
    );
    if (confirmDelete) {
      alert(`Address "${address}" deleted successfully!`);
    }
  };

  return ( 
    <>
    <Header/>
    <div className="bg-gray- mt-16 min-h-screen">
      {/* Cover Photo and Header */}
      <div className="relative">
        <img
          src="https://www.shutterstock.com/image-vector/templates-web-banner-abstract-natural-260nw-1982395844.jpg"
          alt="Cover"
          className="w-full h-48 object-cover"
          />
        <div className="absolute top-4 right-8">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Edit Profile
          </button>
        </div>
        <div className="absolute bottom-[-32px] left-16 flex items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full border-4 border-white"></div>
          <div className="ml-4">
            <h3 className="text-lg font-bold">User Name</h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-16 px-4 sm:px-8 flex flex-col sm:flex-row">
        {/* Left Panel */}
        <div className="w-full sm:w-1/4 bg-white shadow-md rounded-md p-4 mb-8 sm:mb-0">
          <h2 className="text-xl font-bold mb-4">Food orders</h2>
          <ul className="space-y-2 text-gray-600">
            <h3>
              <li className="text-lg hover:text-red-500 cursor-pointer">
                Your orders
              </li>
            </h3>
            <h3>
              <li className="text-lg hover:text-red-500 cursor-pointer">
                Favourite orders
              </li>
            </h3>
            <h3>
              <li className="text-red-500 font-bold cursor-pointer">
                Your Addresses
              </li>
            </h3>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-4">Table bookings</h2>
          <ul className="space-y-2 text-gray-600">
            <h3>
              <li className="text-lg hover:text-red-500 cursor-pointer">
                Your bookings
              </li>
            </h3>
          </ul>
          <h2 className="text-xl font-bold mt-6 mb-4">More</h2>
          <ul className="space-y-2 text-gray-600">
            <h3>
              <li className="text-lg hover:text-red-500 cursor-pointer">
                Settings
              </li>
            </h3>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white shadow-md rounded-md sm:ml-8 p-6 space-y-8">
          {/* Your Addresses Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Your Addresses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Add Address Card */}
              <div className="border border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-red-500 cursor-pointer p-4">
                <span className="text-3xl">+</span>
                <p>Add Address</p>
              </div>

              {/* Address Cards */}
              <div className="border border-gray-300 rounded-md p-4">
                <h4 className="font-bold mb-2">Home</h4>
                <p className="text-sm text-gray-500">
                  Gandhi Nagar near Bhatia Building Shiv Mandir Road, Dhanbad,
                  Gandhi Rd 2
                </p>
                <div className="flex space-x-4 mt-4 text-red-500 text-sm">
                  <button onClick={handleEdit} className="hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        "Gandhi Nagar near Bhatia Building Shiv Mandir Road"
                      )
                    }
                    className="hover:underline"
                    >
                    Delete
                  </button>
                </div>
              </div>

              <div className="border border-gray-300 rounded-md p-4">
                <h4 className="font-bold mb-2">Home</h4>
                <p className="text-sm text-gray-500">
                  Mukesh Kumar Singh, Shivam Apartment, 83 Sarat Chatterjee Road,
                  Ground
                </p>
                <div className="flex space-x-4 mt-4 text-red-500 text-sm">
                  <button onClick={handleEdit} className="hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        "Mukesh Kumar Singh, Shivam Apartment, Sarat Chatterjee Road"
                      )
                    }
                    className="hover:underline"
                    >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Your Bookings Section */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-bold mb-4">Your Bookings</h3>
            <div className="mb-6">
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-md mr-2 text-sm sm:text-base w-full sm:w-auto ${
                  activeTab === "past"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-600"
                }`}
                >
                Past
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto ${
                  activeTab === "upcoming"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Upcoming
              </button>
            </div>
            {activeTab === "past" ? (
              <div className="text-center text-gray-500">
                <img
                  src="/images/no-reservations.jpg" // Update with the correct path
                  alt="No Reservations"
                  className="mx-auto mb-4"
                  />
                <p>Looks like you don't have any past reservations.</p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <img
                  src="/images/no-reservations.jpg" // Update with the correct path
                  alt="No Reservations"
                  className="mx-auto mb-4"
                  />
                <p>Looks like you don't have any upcoming reservations.</p>
              </div>
            )}
          </div>

          {/* Your Orders Section */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-bold mb-4">Your Orders</h3>
            {uploadedPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {uploadedPhotos.map((photo, index) => (
                  <img
                  key={index}
                  src={photo}
                  alt={`Uploaded Screenshot ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <img
                  src="/images/placeholder.jpg"
                  alt="Placeholder"
                  className="mx-auto mb-4 w-40 h-40 object-cover rounded-md"
                  />
                <p className="text-gray-500">Nothing here yet</p>
              </div>
            )}
            <button
              onClick={() =>
                handleUploadedPhoto("https://via.placeholder.com/150")
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
              >
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
              </>
  );
};

export default Profile;
