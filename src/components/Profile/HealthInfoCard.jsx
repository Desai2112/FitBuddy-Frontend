import React from "react";
import { FaHeartbeat } from "react-icons/fa";

const HealthInfoCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-2">
          <FaHeartbeat />
        </div>
        <h2 className="text-lg font-semibold">Health Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg text-center hover:shadow-sm transition-all duration-300 transform hover:scale-105 border border-teal-100">
          <span className="text-gray-600 text-sm mb-1">Blood Group</span>
          <span className="font-semibold text-lg text-teal-700">{profile?.healthInfo?.bloodGroup || "N/A"}</span>
        </div>
        <div className="flex flex-col p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg text-center hover:shadow-sm transition-all duration-300 transform hover:scale-105 border border-teal-100">
          <span className="text-gray-600 text-sm mb-1">Height</span>
          <span className="font-semibold text-lg text-teal-700">
            {profile?.healthInfo?.height ? `${profile.healthInfo.height} cm` : "N/A"}
          </span>
        </div>
        <div className="flex flex-col p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg text-center hover:shadow-sm transition-all duration-300 transform hover:scale-105 border border-teal-100">
          <span className="text-gray-600 text-sm mb-1">Weight</span>
          <span className="font-semibold text-lg text-teal-700">
            {profile?.healthInfo?.weight ? `${profile.healthInfo.weight} kg` : "N/A"}
          </span>
        </div>
      </div>
      <div>
        <span className="text-gray-600 text-sm mb-2 block">Medical Conditions</span>
        {profile?.healthInfo?.medicalConditions?.length > 0 ? (
          <div className="bg-gradient-to-r from-teal-50 to-white rounded-lg p-4 border border-teal-100 hover:shadow-sm transition-all duration-300">
            <ul className="list-disc pl-5 space-y-1">
              {profile.healthInfo.medicalConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-teal-50 to-white rounded-lg p-4 text-gray-500 italic border border-teal-100">
            No medical conditions reported
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthInfoCard;