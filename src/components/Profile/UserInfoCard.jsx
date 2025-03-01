import React from "react";
import { FaUser } from "react-icons/fa";

const UserInfoCard = ({ data, profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white mb-4 border-2 border-teal-200 shadow-md transform hover:rotate-3 transition-transform duration-300">
          <FaUser className="text-4xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{data?.name || "User"}</h2>
        <p className="text-gray-500 text-sm">Member since Jan 2023</p>
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg hover:shadow-sm transition-all duration-300 transform hover:scale-105">
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold text-lg text-teal-700">{profile?.healthInfo?.bloodGroup || "N/A"}</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg hover:shadow-sm transition-all duration-300 transform hover:scale-105">
            <p className="text-sm text-gray-500">BMI</p>
            <p className="font-semibold text-lg text-teal-700">{profile?.healthInfo?.bmi || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;