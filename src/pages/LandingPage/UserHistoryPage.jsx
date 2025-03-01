import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaFileAlt,
  FaExclamationTriangle,
  FaHistory,
  FaDownload,
} from "react-icons/fa";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UserHistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const contentRef = useRef(null); // Ref to capture the content for PDF

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true,
        });
        setProfile(response.data.data);
        setData(response.data.userData);
        setUserId(response.data.userData?._id || "defaultUserId");
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const downloadPDF = async () => {
    const element = contentRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Increase resolution
        useCORS: true, // Handle cross-origin images if any
        logging: false, // Disable logging for cleaner console
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${data?.name || "User"}-History-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-teal-500 shadow-lg mr-4 border-2 border-teal-200 transform hover:scale-105 transition-transform duration-300">
                <FaUser className="text-3xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{data?.name || "User"}</h1>
                <p className="text-teal-100 text-sm">Complete User History</p>
              </div>
            </div>
            <button
              onClick={downloadPDF}
              className="bg-white text-teal-600 px-4 py-2 rounded-lg shadow-md hover:bg-teal-50 hover:shadow-lg transition-all duration-300 flex items-center transform hover:scale-105"
            >
              <FaDownload className="mr-2" /> Export as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white mb-4 border-2 border-teal-200 shadow-md transform hover:rotate-3 transition-transform duration-300">
                  <FaUser className="text-4xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{data?.name || "User"}</h2>
                <p className="text-gray-500 text-sm">Member since Jan 2023</p>
              </div>
              <div className="border-t border-teal-100 pt-4 mt-4 space-y-4">
                <div className="text-center p-3 bg-gradient-to-br from-teal-50 to-white rounded-lg">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-semibold text-sm text-teal-700 truncate">{userId}</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-teal-50 to-white rounded-lg">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-sm text-teal-700 truncate">{data?.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-3">
                  <FaPhone />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Mobile", value: profile?.contactInfo?.mobile },
                  { label: "Alternate", value: profile?.contactInfo?.alternatePhone },
                  { label: "WhatsApp", value: profile?.contactInfo?.whatsapp },
                  { label: "Email", value: data?.email },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-gray-600 text-sm mb-1">{item.label}</span>
                    <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 text-gray-800 font-medium">
                      {item.value || "Not provided"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-3">
                  <FaMapMarkerAlt />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Address Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[
                    { label: "Street", value: profile?.address?.street },
                    { label: "City", value: profile?.address?.city },
                    { label: "State", value: profile?.address?.state },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">{item.label}</span>
                      <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 text-gray-800 font-medium">
                        {item.value || "Not provided"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Country", value: profile?.address?.country },
                    { label: "Postal Code", value: profile?.address?.postalCode },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">{item.label}</span>
                      <span className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 text-gray-800 font-medium">
                        {item.value || "Not provided"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-3">
                  <FaHeartbeat />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Health Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {[
                  { label: "Blood Group", value: profile?.healthInfo?.bloodGroup },
                  { label: "Height", value: profile?.healthInfo?.height ? `${profile.healthInfo.height} cm` : "N/A" },
                  { label: "Weight", value: profile?.healthInfo?.weight ? `${profile.healthInfo.weight} kg` : "N/A" },
                  { label: "BMI", value: profile?.healthInfo?.bmi },
                  { label: "Age", value: profile?.healthInfo?.age },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col p-4 bg-gradient-to-br from-teal-50 to-white rounded-lg border border-teal-100 text-center hover:shadow-sm transition-all duration-300">
                    <span className="text-gray-600 text-sm mb-1">{item.label}</span>
                    <span className="font-semibold text-teal-700">{item.value || "N/A"}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  { label: "Medical Conditions", list: profile?.healthInfo?.medicalConditions },
                  { label: "Allergies", list: profile?.healthInfo?.allergies },
                ].map((item, index) => (
                  <div key={index}>
                    <span className="text-gray-600 text-sm mb-2 block font-medium">{item.label}</span>
                    {item.list?.length > 0 ? (
                      <div className="bg-gradient-to-r from-teal-50 to-white rounded-lg p-4 border border-teal-100">
                        <ul className="list-disc pl-5 space-y-2 text-gray-800">
                          {item.list.map((entry, i) => (
                            <li key={i}>{entry}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-teal-50 to-white rounded-lg p-4 border border-teal-100 text-gray-500 italic">
                        No {item.label.toLowerCase()} reported
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3">
                  <FaExclamationTriangle />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Emergency Contacts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Primary Contact", contact: profile?.emergencyContact?.primaryContact },
                  { title: "Secondary Contact", contact: profile?.emergencyContact?.secondaryContact },
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-amber-50 to-white rounded-lg p-4 border border-amber-100">
                    <h3 className="font-medium text-gray-800 mb-3">{item.title}</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Name", value: item.contact?.name },
                        { label: "Relationship", value: item.contact?.relationship },
                        { label: "Phone", value: item.contact?.phone },
                      ].map((detail, i) => (
                        <div key={i} className="flex items-center">
                          <span className="w-24 text-gray-600 text-sm font-medium">{detail.label}:</span>
                          <span className="text-gray-800">{detail.value || "Not provided"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-3">
                    <FaFileAlt />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
                </div>
                <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 flex items-center hover:shadow-lg">
                  <FaHistory className="mr-2" /> View All History
                </button>
              </div>
              {profile?.documentList?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profile.documentList.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100 hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <FaFileAlt className="text-teal-500" />
                        <span className="truncate max-w-32 text-gray-800 font-medium">{doc.name}</span>
                      </div>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600 transition-all duration-300 shadow-sm hover:shadow"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-teal-50 rounded-lg p-6 text-center border border-teal-100">
                  <FaFileAlt className="text-4xl text-teal-200 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">No documents available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;