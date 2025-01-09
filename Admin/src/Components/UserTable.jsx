import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteUserConfirmationModal from "./modals/DeleteUserConfirmationModal";
import EditUserModal from "./modals/EditUserModal";
import AddUserModal from "./modals/AddUserModal";
import { Users, Mail, Phone, Tag, Edit2, Trash2, UserPlus, Building } from "lucide-react";
import AdminNavbar from "./AdminNavbar";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4001/user/all")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const addUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:4001/user/create", newUser);
      setUsers([...users, response.data.newUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const editUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4001/user/update/${updatedUser._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === updatedUser._id ? response.data.user : user
        )
      );
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, user not authenticated.');
        return;
      }

      const response = await axios.delete(`http://localhost:4001/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('User deleted successfully', response.data);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  return (
    <>
        <AdminNavbar/>

    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            onClick={() => setShowAddModal(true)}
            >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Profile</th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>Role</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <img
                        src={user.profilePicture || '/api/placeholder/32/32'}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-8 h-8 rounded-full object-cover"
                        />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600">{user.phoneNumber}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="capitalize text-gray-600">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                          }}
                          >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={addUser}
          />
        )}

        {showEditModal && (
          <EditUserModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={editUser}
            user={selectedUser}
            />
          )}

        {showDeleteModal && (
          <DeleteUserConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => deleteUser(selectedUser._id)}
          />
        )}
      </div>
    </div>
        </>
  );
};

export default UserTable;