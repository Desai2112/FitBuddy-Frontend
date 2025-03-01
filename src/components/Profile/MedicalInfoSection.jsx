import React from "react";
import { FaNotesMedical, FaPlus, FaTrash } from "react-icons/fa";

const MedicalInfoSection = ({
  formData,
  handleArrayItemChange,
  addArrayItem,
  removeArrayItem,
  profile,
  editing
}) => {
  if (editing) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Medical Information</h3>

        {/* Allergies - Dynamic Fields */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-gray-700">Allergies</label>
            <button
              type="button"
              onClick={() => addArrayItem('allergies')}
              className="text-primary hover:text-primary-dark p-1"
            >
              <FaPlus size={14} />
            </button>
          </div>

          {formData.allergies.length === 0 ? (
            <p className="text-sm text-gray-500 italic mb-2">No allergies added</p>
          ) : (
            formData.allergies.map((allergy, index) => (
              <div key={`allergy-${index}`} className="flex mb-2">
                <input
                  type="text"
                  value={allergy}
                  onChange={(e) => handleArrayItemChange('allergies', index, e.target.value)}
                  className="flex-1 p-2 border rounded-l-md"
                  placeholder="Enter allergy"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('allergies', index)}
                  className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Medical Conditions - Dynamic Fields */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-gray-700">Medical Conditions</label>
            <button
              type="button"
              onClick={() => addArrayItem('medicalConditions')}
              className="text-primary hover:text-primary-dark p-1"
            >
              <FaPlus size={14} />
            </button>
          </div>

          {formData.medicalConditions.length === 0 ? (
            <p className="text-sm text-gray-500 italic mb-2">No medical conditions added</p>
          ) : (
            formData.medicalConditions.map((condition, index) => (
              <div key={`condition-${index}`} className="flex mb-2">
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => handleArrayItemChange('medicalConditions', index, e.target.value)}
                  className="flex-1 p-2 border rounded-l-md"
                  placeholder="Enter medical condition"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('medicalConditions', index)}
                  className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Medications - Dynamic Fields */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-gray-700">Medications</label>
            <button
              type="button"
              onClick={() => addArrayItem('medications')}
              className="text-primary hover:text-primary-dark p-1"
            >
              <FaPlus size={14} />
            </button>
          </div>

          {formData.medications.length === 0 ? (
            <p className="text-sm text-gray-500 italic mb-2">No medications added</p>
          ) : (
            formData.medications.map((medication, index) => (
              <div key={`medication-${index}`} className="flex mb-2">
                <input
                  type="text"
                  value={medication}
                  onChange={(e) => handleArrayItemChange('medications', index, e.target.value)}
                  className="flex-1 p-2 border rounded-l-md"
                  placeholder="Enter medication"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('medications', index)}
                  className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium flex items-center gap-2 border-b pb-2 mb-4">
        <FaNotesMedical className="text-primary" /> Medical Information
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Allergies</p>
          {profile?.allergies && profile.allergies.length > 0 ? (
            <ul className="list-disc pl-5 mt-1">
              {profile.allergies.map((allergy, index) => (
                <li key={index} className="font-medium">{allergy}</li>
              ))}
            </ul>
          ) : (
            <p className="font-medium text-gray-700">No allergies</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Medical Conditions</p>
          {profile?.medicalConditions && profile.medicalConditions.length > 0 ? (
            <ul className="list-disc pl-5 mt-1">
              {profile.medicalConditions.map((condition, index) => (
                <li key={index} className="font-medium">{condition}</li>
              ))}
            </ul>
          ) : (
            <p className="font-medium text-gray-700">No medical conditions</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Medications</p>
          {profile?.medications && profile.medications.length > 0 ? (
            <ul className="list-disc pl-5 mt-1">
              {profile.medications.map((medication, index) => (
                <li key={index} className="font-medium">{medication}</li>
              ))}
            </ul>
          ) : (
            <p className="font-medium text-gray-700">No medications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoSection;