import React from 'react'
// import { useAuth } from '../context/AuthProvider';
import toast from'react-hot-toast';
import { useAuth } from '../Context/AuthProvider';

function Logout() {
    const [authUser, setAuthUser] = useAuth();
    const handleLogout = () => {
      try {
        setAuthUser({
          ...authUser,
          user: null,
        });
        localStorage.removeItem("user");
        toast.success("Logout successfully");
  
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        toast.error("Error: " + error);
        setTimeout(() => {}, 2000);
      }
    };
  return (
    <div>
        <button 
        onClick={handleLogout}> Logout </button></div>
  )
}

export default Logout