import React from "react";
import { FaPhone } from "react-icons/fa";

const ContactInfoCard = ({ profile, data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-2">
          <FaPhone />
        </div>
        <h2 className="text-lg font-semibold">Contact Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">Mobile Phone</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.contactInfo?.mobile || "Not provided"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">Alternate Phone</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.contactInfo?.alternatePhone || "Not provided"}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">WhatsApp</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {profile?.contactInfo?.whatsapp || "Not provided"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm mb-1">Email Address</span>
            <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
              {data?.email || profile?.userId || "Not provided"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;