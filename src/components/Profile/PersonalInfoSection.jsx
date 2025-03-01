import React from "react";
import { FaUser, FaRulerVertical, FaWeight } from "react-icons/fa";

const PersonalInfoSection = ({ formData, handleChange, profile, editing }) => {
  if (editing) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Personal Information</h3>

        <div>
          <label className="block text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Blood Type</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium flex items-center gap-2 border-b pb-2 mb-4">
        <FaUser className="text-primary" /> Personal Information
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Date of Birth</p>
          <p className="font-medium">
            {profile?.dateOfBirth
              ? new Date(profile.dateOfBirth).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-medium">
            {profile?.gender
              ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
              : "Not specified"}
          </p>
        </div>

        <div className="flex gap-6">
          <div>
            <p className="text-sm text-gray-500">Height</p>
            <p className="font-medium flex items-center gap-1">
              <FaRulerVertical className="text-primary" />
              {profile?.height ? `${profile.height} cm` : "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium flex items-center gap-1">
              <FaWeight className="text-primary" />
              {profile?.weight ? `${profile.weight} kg` : "Not specified"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Blood Type</p>
          <p className="font-medium">{profile?.bloodType || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;