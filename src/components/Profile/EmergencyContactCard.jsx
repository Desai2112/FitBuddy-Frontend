import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const EmergencyContactCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-2">
          <FaExclamationTriangle />
        </div>
        <h2 className="text-lg font-semibold">Emergency Contact</h2>
      </div>
      <div className="space-y-4 border-l-2 border-amber-300 pl-4">
        <div className="flex items-center">
          <span className="w-28 text-gray-600 text-sm">Name:</span>
          <span className="font-medium">{profile?.emergencyContact?.primaryContact?.name || "Not provided"}</span>
        </div>
        <div className="flex items-center">
          <span className="w-28 text-gray-600 text-sm">Relationship:</span>
          <span>{profile?.emergencyContact?.primaryContact?.relationship || "Not provided"}</span>
        </div>
        <div className="flex items-center">
          <span className="w-28 text-gray-600 text-sm">Phone:</span>
          <span>{profile?.emergencyContact?.primaryContact?.phone || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactCard;