import React from "react";
import { FaUser, FaEdit, FaSave, FaTimes, FaSignOutAlt } from "react-icons/fa";

const ProfileHeader = ({ data, editMode, toggleEditMode, handleLogout }) => {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-teal-500 shadow-lg mr-4 border-2 border-teal-300 transform hover:scale-105 transition-transform duration-300">
              <FaUser className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{data?.name || "User"}</h1>
              <p className="text-teal-100 text-sm">Profile Overview</p>
            </div>
          </div>
          <div className="flex space-x-3">
            {editMode ? (
              <>
                <button
                  className="bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                  onClick={toggleEditMode}
                >
                  <FaSave className="mr-2" /> Save
                </button>
                <button
                  className="bg-white text-red-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                  onClick={toggleEditMode}
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-white text-teal-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                  onClick={toggleEditMode}
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
                <button
                  className="bg-white text-red-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;