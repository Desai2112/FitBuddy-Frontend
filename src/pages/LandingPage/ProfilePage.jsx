import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaHeartbeat, FaFileAlt, FaExclamationTriangle, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [data, setData]=useState(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch profile data from the API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true,
        });
        setProfile(response.data.data);
        setData(response.data.userData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-400"></div>
      </div>
    );
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-teal-500 shadow-lg mr-4">
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
                    className="bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center"
                    onClick={toggleEditMode}
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button 
                    className="bg-white text-red-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center"
                    onClick={toggleEditMode}
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </>
              ) : (
                <button 
                  className="bg-white text-teal-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center"
                  onClick={toggleEditMode}
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Summary Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4">
                  <FaUser className="text-4xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{data?.name || "User"}</h2>
                <p className="text-gray-500 text-sm">Member since Jan 2023</p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-semibold text-lg">{profile?.healthInfo?.bloodGroup || "N/A"}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">BMI</p>
                    <p className="font-semibold text-lg">{profile?.healthInfo?.bmi || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Emergency Contact Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <FaExclamationTriangle className="text-amber-500 mr-2" />
                <h2 className="text-lg font-semibold">Emergency Contact</h2>
              </div>
              
              <div className="space-y-4">
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
            
            {/* Documents Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaFileAlt className="text-teal-500 mr-2" />
                  <h2 className="text-lg font-semibold">Documents</h2>
                </div>
                <button className="text-teal-500 hover:text-teal-700 text-sm">View All</button>
              </div>
              
              {profile?.documentList?.length > 0 ? (
                <div className="space-y-3">
                  {profile.documentList.map((doc, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="truncate max-w-32">{doc.name}</span>
                      <a 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600 transition"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center p-4">No documents available</p>
              )}
            </div>
          </div>
          
          {/* Right Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <FaPhone className="text-teal-500 mr-2" />
                <h2 className="text-lg font-semibold">Contact Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">Mobile Phone</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.contactInfo?.mobile || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">Alternate Phone</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.contactInfo?.alternatePhone || "Not provided"}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">WhatsApp</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.contactInfo?.whatsapp || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">Email Address</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{data?.email || profile?.userId || "Not provided"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Address Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-teal-500 mr-2" />
                <h2 className="text-lg font-semibold">Address Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">Street</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.address?.street || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">City</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.address?.city || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">State</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.address?.state || "Not provided"}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">Country</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.address?.country || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">Postal Code</span>
                    <span className="p-3 bg-gray-50 rounded-lg">{profile?.address?.postalCode || "Not provided"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Health Information Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <FaHeartbeat className="text-teal-500 mr-2" />
                <h2 className="text-lg font-semibold">Health Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg text-center">
                  <span className="text-gray-600 text-sm mb-1">Blood Group</span>
                  <span className="font-semibold text-lg">{profile?.healthInfo?.bloodGroup || "N/A"}</span>
                </div>
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg text-center">
                  <span className="text-gray-600 text-sm mb-1">Height</span>
                  <span className="font-semibold text-lg">{profile?.healthInfo?.height ? `${profile.healthInfo.height} cm` : "N/A"}</span>
                </div>
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg text-center">
                  <span className="text-gray-600 text-sm mb-1">Weight</span>
                  <span className="font-semibold text-lg">{profile?.healthInfo?.weight ? `${profile.healthInfo.weight} kg` : "N/A"}</span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-600 text-sm mb-2 block">Medical Conditions</span>
                {profile?.healthInfo?.medicalConditions?.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="list-disc pl-5 space-y-1">
                      {profile.healthInfo.medicalConditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-500 italic">
                    No medical conditions reported
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;