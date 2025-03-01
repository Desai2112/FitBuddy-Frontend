import React from "react";

const EmergencyContactSection = ({ formData, handleChange, profile, editing }) => {
  if (editing) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Emergency Contact</h3>

        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="emergencyContact.name"
            value={formData.emergencyContact.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Relationship</label>
          <input
            type="text"
            name="emergencyContact.relationship"
            value={formData.emergencyContact.relationship}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="emergencyContact.phone"
            value={formData.emergencyContact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium border-b pb-2 mb-4">Emergency Contact</h3>

      {profile?.emergencyContact?.name ? (
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{profile.emergencyContact.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Relationship</p>
            <p className="font-medium">{profile.emergencyContact.relationship || "Not specified"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{profile.emergencyContact.phone || "Not specified"}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No emergency contact specified</p>
      )}
    </div>
  );
};

export default EmergencyContactSection;