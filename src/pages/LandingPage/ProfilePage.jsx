import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import UserInfoCard from "../../components/Profile/UserInfoCard";
import QrCodeCard from "../../components/Profile/QrCodeCard";
import EmergencyContactCard from "../../components/Profile/EmergencyContactCard";
import ContactInfoCard from "../../components/Profile/ContactInfoCard";
import HealthInfoCard from "../../components/Profile/HealthInfoCard";
import DocumentsSection from "../../components/Profile/DocumentSection";
import AddressInfoCard from "../../components/Profile/AddressInfoCard";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const [documents, setDocuments] = useState([]);

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

        // Process documents from the backend
        if (response.data.data?.documentList && response.data.data.documentList.length > 0) {
          const enhancedDocs = response.data.data.documentList.map((doc) => ({
            id: doc._id,
            name: doc.name,
            url: doc.url,
            visible: doc.isVisible,
            type: getDocumentType(doc.name),
            uploadDate: doc.createdAt ? new Date(doc.createdAt).toISOString().split("T")[0] : getRandomDate(),
            size: getRandomSize(), // You might want to fetch actual size from backend in the future
          }));
          
          setDocuments(enhancedDocs);
        } else {
          // If no documents are available, set an empty array
          setDocuments([]);
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

  const toggleEditMode = () => setEditMode(!editMode);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out");
    }
  };

  const toggleDocumentVisibility = async (docId, currentVisibility) => {
    try {
      if (currentVisibility) {
        const response = await axios.post(
          "http://localhost:5000/api/profile/doc/stop",
          { docId },
          { withCredentials: true }
        );
        if (response.data.success) {
          const updatedDocuments = documents.map(doc =>
            doc.id === docId ? { ...doc, visible: false } : doc
          );
          setDocuments(updatedDocuments);
          showNotification("Document visibility updated successfully");
        }
      } else {
        const updatedDocuments = documents.map(doc =>
          doc.id === docId ? { ...doc, visible: true } : doc
        );
        setDocuments(updatedDocuments);
        showNotification("Document visibility updated successfully");
      }
    } catch (error) {
      console.error("Error updating document visibility:", error);
      showNotification("Failed to update document visibility", "error");
    }
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"} flex items-center space-x-2 z-50 animate-fade-in-up`;
    notification.innerHTML = `${type === "success"
        ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>'
      } <span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("animate-fade-out-down");
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <ProfileHeader data={data} editMode={editMode} toggleEditMode={toggleEditMode} handleLogout={handleLogout} />
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <UserInfoCard data={data} profile={profile} />
            <QrCodeCard userId={userId} data={data} />
            <EmergencyContactCard profile={profile} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <ContactInfoCard profile={profile} data={data} />
            <AddressInfoCard profile={profile} />
            <HealthInfoCard profile={profile} />
            <DocumentsSection
              documents={documents}
              setDocuments={setDocuments}
              toggleDocumentVisibility={toggleDocumentVisibility}
              showNotification={showNotification}
              getDocumentType={getDocumentType}
              formatFileSize={formatFileSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;