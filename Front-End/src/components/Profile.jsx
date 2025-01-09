import React from "react";

const Profile = () => {
  return (
    <div className="bg-white text-orange-600 font-serif min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b border-gray-300">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white text-2xl">
          A
        </div>
        {/* Profile Name */}
        <h1 className="text-2xl font-bold">John Doe</h1>
        {/* View Activity */}
        <a href="#" className="text-green-600 hover:underline">
          View Activity
        </a>
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-4">
        {/* Menu Item */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <div className="flex items-center">
            <span className="text-xl mr-4">📜</span>
            <span className="flex-grow text-base">My Orders</span>
          </div>
          <a href="#" className="text-blue-600 hover:underline">
            View
          </a>
        </div>
        {/* Add more menu items here as needed */}
        <div className="profile-menu">
                {menuItems.map((item, index) => (
                    <div className="menu-item" key={index}>
                        <div className="icon">{item.icon}</div>
                        <div className="item-name">{item.name}</div>
                        <a href="#" className="item-action">{item.action}</a>
                    </div>
                ))}
            </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
      &copy; 2024 Elysian Feast. All rights reserved.
      </div>
    </div>
  );
};
const menuItems = [
    { icon: '📞', name: 'Phone Number', action: 'Change' },
    { icon: '🔒', name: 'Password', action: 'Change' },
    { icon: '📍', name: 'Your Address Book', action: 'Update' },
    { icon: '🥡', name: 'Your Orders', action: 'View' },
    { icon: '🍽️', name: 'Your Dining Reservations', action: 'View' },
    { icon: 'ℹ️', name: 'About', action: '>' },
    { icon: '📝', name: 'Feedback', action: '>' },
    { icon: '⚙️', name: 'Settings', action: '>' },
    { icon: '🔐', name: 'Logout', action: '>' },
];

export default Profile;
