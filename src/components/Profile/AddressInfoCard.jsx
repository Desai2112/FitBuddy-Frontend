import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const AddressInfoCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-2">
          <FaMapMarkerAlt />
        </div>
        <h2 className="text-lg font-semibold">Address Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">Street</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.address?.street || "Not provided"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">City</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.address?.city || "Not provided"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">State</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.address?.state || "Not provided"}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">Country</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.address?.country || "Not provided"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">Postal Code</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.address?.postalCode || "Not provided"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfoCard;