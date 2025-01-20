import React, { useState } from "react";

const ProfilePage = () => {
  const [name, setName] = useState("Akshita Vats");
  const [mobile, setMobile] = useState("9264264893");
  const [dob, setDob] = useState("03/02/2004");
  const [gender, setGender] = useState("Female");

  const handleUpdate = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center text-black">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <header className="text-xl font-semibold text-center mb-6">Edit Profile</header>

        {/* Profile Image */}
        <div className="relative flex justify-center mb-4">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
            AV
          </div>
          
        </div>

        {/* Profile Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-white text-black rounded border border-green-600"
              />
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium mb-1">Mobile</label>
          </div>
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 bg-white text-black rounded border border-green-600"
          />

          

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 bg-white text-black rounded border border-green-600"
            />
          </div>

        
            

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 bg-white text-black rounded border border-green-600"
              >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleUpdate}
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
