import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaFileAlt,
  FaExclamationTriangle,
  FaEdit,
  FaSave,
  FaTimes,
  FaQrcode,
  FaDownload,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaSignOutAlt,
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
  FaFileMedical,
  FaFileContract,
  FaPlus,
  FaFilter,
  FaSearch,
  FaSortAmountDown,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isQrHovered, setIsQrHovered] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [documentFilter, setDocumentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);

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

        if (response.data.data?.documentList) {
          const enhancedDocs = response.data.data.documentList.map((doc) => ({
            ...doc,
            visible: true,
            type: getDocumentType(doc.name),
            uploadDate: getRandomDate(),
            size: getRandomSize(),
          }));

          if (enhancedDocs.length < 3) {
            enhancedDocs.push(
              {
                id: "doc-x1",
                name: "Medical Report.pdf",
                url: "#",
                visible: true,
                type: "medical",
                uploadDate: getRandomDate(),
                size: getRandomSize(),
              },
              {
                id: "doc-x2",
                name: "Insurance Policy.pdf",
                url: "#",
                visible: true,
                type: "insurance",
                uploadDate: getRandomDate(),
                size: getRandomSize(),
              }
            );
          }
          setDocuments(enhancedDocs);
        } else {
          setDocuments([
            {
              id: "doc-1",
              name: "Medical Report.pdf",
              url: "#",
              visible: true,
              type: "medical",
              uploadDate: getRandomDate(),
              size: getRandomSize(),
            },
            {
              id: "doc-2",
              name: "Insurance Policy.pdf",
              url: "#",
              visible: true,
              type: "insurance",
              uploadDate: getRandomDate(),
              size: getRandomSize(),
            },
            {
              id: "doc-3",
              name: "Vaccination Certificate.png",
              url: "#",
              visible: true,
              type: "vaccination",
              uploadDate: getRandomDate(),
              size: getRandomSize(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const getDocumentType = (filename) => {
    if (!filename) return "other";
    filename = filename.toLowerCase();
    if (filename.includes("medical") || filename.includes("health")) return "medical";
    if (filename.includes("insurance") || filename.includes("policy")) return "insurance";
    if (filename.includes("vaccination") || filename.includes("vaccine")) return "vaccination";
    if (filename.includes("prescription")) return "prescription";
    if (filename.includes("report")) return "report";
    const extension = filename.split(".").pop();
    if (extension === "pdf") return "pdf";
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
    if (["doc", "docx"].includes(extension)) return "word";
    if (["xls", "xlsx"].includes(extension)) return "excel";
    return "other";
  };

  const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      .toISOString()
      .split("T")[0];
  };

  const getRandomSize = () => Math.floor(Math.random() * 5000) + 100;

  const formatFileSize = (sizeInKB) => {
    if (sizeInKB < 1000) return `${sizeInKB}KB`;
    return `${(sizeInKB / 1024).toFixed(1)}MB`;
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case "pdf": return <FaFilePdf className="text-red-500" />;
      case "image": return <FaFileImage className="text-blue-500" />;
      case "word": return <FaFileWord className="text-blue-700" />;
      case "excel": return <FaFileExcel className="text-green-600" />;
      case "medical": return <FaFileMedical className="text-teal-600" />;
      case "insurance": return <FaFileContract className="text-purple-600" />;
      case "vaccination": return <FaCheckCircle className="text-green-500" />;
      default: return <FaFileAlt className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-400"></div>
      </div>
    );
  }

  const toggleEditMode = () => setEditMode(!editMode);

  const downloadQRCode = () => {
    const canvas = document.getElementById("user-qr-code");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${data?.name || "user"}-qr-code.png`;
      link.href = url;
      link.click();
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out");
    }
  };

  const toggleDocumentVisibility = (index) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].visible = !updatedDocuments[index].visible;
    setDocuments(updatedDocuments);
  };

  const showDeleteConfirmation = (index) => setConfirmDelete(index);
  const cancelDelete = () => setConfirmDelete(null);

  const confirmDeleteDocument = async (index) => {
    try {
      const updatedDocuments = documents.filter((_, i) => i !== index);
      setDocuments(updatedDocuments);
      setConfirmDelete(null);
      showNotification("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      showNotification("Failed to delete document", "error");
    }
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } flex items-center space-x-2 z-50 animate-fade-in-up`;
    notification.innerHTML = `${
      type === "success"
        ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>'
    } <span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("animate-fade-out-down");
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesFilter = documentFilter === "all" || doc.type === documentFilter;
    const matchesSearch = !searchQuery || doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayedDocuments = showAllDocuments ? filteredDocuments : filteredDocuments.slice(0, 3);
  const userHistoryUrl = `http://localhost:5173/user/history/${userId}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-teal-500 shadow-lg mr-4 border-2 border-teal-300 transform hover:scale-105 transition-transform duration-300">
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
                    className="bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                    onClick={toggleEditMode}
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button
                    className="bg-white text-red-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                    onClick={toggleEditMode}
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-white text-teal-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                    onClick={toggleEditMode}
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                  <button
                    className="bg-white text-red-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition flex items-center transform hover:scale-105"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
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

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-2">
                    <FaQrcode />
                  </div>
                  <h2 className="text-lg font-semibold">User History QR</h2>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 border border-dashed border-teal-200 rounded-lg bg-gradient-to-br from-white to-teal-50">
                <div
                  className="relative cursor-pointer transition-all duration-300 transform hover:scale-105"
                  onMouseEnter={() => setIsQrHovered(true)}
                  onMouseLeave={() => setIsQrHovered(false)}
                >
                  <QRCodeSVG
                    id="user-qr-code"
                    value={userHistoryUrl}
                    size={150}
                    level="H"
                    includeMargin={true}
                    className="mb-4 rounded-lg shadow-sm"
                    bgColor="#ffffff"
                    fgColor="#0d9488"
                  />
                  {isQrHovered && (
                    <div
                      className="absolute inset-0 bg-teal-500 bg-opacity-90 flex flex-col items-center justify-center text-white p-4 rounded transition-all"
                      onClick={() => (window.location.href = userHistoryUrl)}
                    >
                      <p className="text-sm font-semibold mb-2">Click to visit:</p>
                      <p className="text-xs text-center break-all">{userHistoryUrl}</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 text-center mb-4">Scan to view complete history</p>
                <div className="flex gap-2">
                  <button
                    onClick={downloadQRCode}
                    className="px-3 py-2 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600 transition flex items-center shadow-sm hover:shadow"
                  >
                    <FaDownload className="mr-2" /> Download
                  </button>
                  <button
                    onClick={() => (window.location.href = userHistoryUrl)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition shadow-sm hover:shadow"
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>

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
                  <span className="font-medium">
                    {profile?.emergencyContact?.primaryContact?.name || "Not provided"}
                  </span>
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
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
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
                  <span className="font-semibold text-lg text-teal-700">
                    {profile?.healthInfo?.bloodGroup || "N/A"}
                  </span>
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

            {/* Enhanced Documents Section */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-teal-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                      <FaFileAlt className="text-xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">My Documents</h2>
                  </div>
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 flex items-center hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <FaPlus className="mr-2" /> Add Document
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                  <div className="flex items-center w-full md:w-auto">
                    <div className="relative">
                      <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                      <select
                        value={documentFilter}
                        onChange={(e) => setDocumentFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm w-full md:w-48 appearance-none"
                      >
                        <option value="all">All Types</option>
                        <option value="medical">Medical</option>
                        <option value="insurance">Insurance</option>
                        <option value="vaccination">Vaccination</option>
                        <option value="pdf">PDF</option>
                        <option value="image">Image</option>
                        <option value="word">Word</option>
                        <option value="excel">Excel</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative w-full md:w-72">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredDocuments.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedDocuments.map((doc, index) => (
                          <div
                            key={doc.id}
                            className="border border-teal-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                          >
                            <div className="p-4 flex items-center justify-between border-b border-teal-50">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                                  {getDocumentIcon(doc.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-gray-800 truncate text-sm">{doc.name}</h3>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatFileSize(doc.size)} • {new Date(doc.uploadDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  doc.visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {doc.visible ? "Visible" : "Hidden"}
                              </span>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-gradient-to-b from-white to-teal-50">
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => toggleDocumentVisibility(index)}
                                  className="flex items-center px-3 py-1 text-sm text-teal-600 hover:bg-teal-100 rounded-md transition-all duration-200"
                                >
                                  {doc.visible ? (
                                    <>
                                      <FaEye className="mr-1" /> Hide
                                    </>
                                  ) : (
                                    <>
                                      <FaEyeSlash className="mr-1" /> Show
                                    </>
                                  )}
                                </button>
                                {doc.visible && (
                                  <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-3 py-1 text-sm text-teal-600 hover:bg-teal-100 rounded-md transition-all duration-200"
                                  >
                                    <FaEye className="mr-1" /> View
                                  </a>
                                )}
                              </div>
                              <button
                                onClick={() => showDeleteConfirmation(index)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-all duration-200"
                              >
                                <FaTrash />
                              </button>
                            </div>
                            {confirmDelete === index && (
                              <div className="p-4 bg-red-50 border-t border-red-100">
                                <p className="text-sm text-red-600 mb-3 font-medium">
                                  Are you sure you want to delete this document?
                                </p>
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={cancelDelete}
                                    className="px-4 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => confirmDeleteDocument(index)}
                                    className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {filteredDocuments.length > 3 && (
                        <div className="text-center mt-6">
                          <button
                            onClick={() => setShowAllDocuments(!showAllDocuments)}
                            className="inline-flex items-center px-4 py-2 text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                          >
                            {showAllDocuments ? (
                              <>
                                Show Less <FaSortAmountDown className="ml-2" />
                              </>
                            ) : (
                              <>
                                Show All ({filteredDocuments.length}) <FaSortAmountDown className="ml-2" />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center bg-teal-50 rounded-xl border border-teal-100">
                      <FaFileAlt className="text-5xl text-teal-200 mb-4" />
                      <p className="text-gray-600 text-center mb-4 font-medium">No documents found matching your criteria</p>
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 flex items-center hover:shadow-lg"
                      >
                        <FaPlus className="mr-2" /> Add Document
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Modal */}
          {isUploadModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Upload New Document</h2>
                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-teal-200 rounded-xl p-8 text-center bg-teal-50 transition-all duration-300 hover:border-teal-300">
                    <FaCloudUploadAlt className="text-5xl text-teal-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-3">Drag and drop files here or</p>
                    <label className="inline-block bg-teal-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-teal-600 transition-all duration-200 shadow-md hover:shadow-lg">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const newDoc = {
                              id: `doc-${Date.now()}`,
                              name: file.name,
                              url: URL.createObjectURL(file),
                              visible: true,
                              type: getDocumentType(file.name),
                              uploadDate: new Date().toISOString().split("T")[0],
                              size: Math.round(file.size / 1024),
                            };
                            setDocuments([...documents, newDoc]);
                            setIsUploadModalOpen(false);
                            showNotification("Document uploaded successfully");
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 text-center">Supported formats: PDF, JPG, PNG, DOCX, XLSX (Max 10MB)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;