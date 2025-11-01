import React, { useState } from "react";
import {
  FaFileAlt, FaPlus, FaFilter, FaSearch, FaEye, FaEyeSlash, FaTrash, FaSortAmountDown,
  FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFileMedical, FaFileContract, FaCheckCircle,
} from "react-icons/fa";
import axiosInstance from "../../api/axios"; // Import your axios instance

const DocumentsSection = ({
  documents, setDocuments, toggleDocumentVisibility, showNotification, getDocumentType, formatFileSize,
}) => {
  const [documentFilter, setDocumentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const filteredDocuments = documents.filter((doc) => {
    const matchesFilter = documentFilter === "all" || doc.type === documentFilter;
    const matchesSearch = !searchQuery || doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayedDocuments = showAllDocuments ? filteredDocuments : filteredDocuments.slice(0, 3);

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

  // Handle file upload with API call
  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      showNotification("File size exceeds 10MB limit", "error");
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(file.type)) {
      showNotification("Unsupported file format. Please upload PDF, JPG, PNG, DOCX, or XLSX files", "error");
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('pdf', file); // Backend expects 'pdf' field name

      // Upload to API
      const response = await axiosInstance.post("/api/profile/adddoc", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Upload response:", response.data);

      // Create new document object for local state
      const newDoc = {
        id: response.data.documentId || `doc-${Date.now()}`, // Use server ID if available
        name: file.name,
        url: response.data.url || URL.createObjectURL(file), // Use server URL if available
        visible: true,
        type: getDocumentType(file.name),
        uploadDate: new Date().toISOString().split("T")[0],
        size: Math.round(file.size / 1024), // Size in KB
      };

      // Update local state
      setDocuments([...documents, newDoc]);
      setIsUploadModalOpen(false);
      showNotification("Document uploaded successfully");
    } catch (error) {
      console.error("Error uploading document:", error);
      showNotification(
        error.response?.data?.message || "Failed to upload document. Please try again.",
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
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
                        className={`text-xs px-2 py-1 rounded-full font-medium ${doc.visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                      >
                        {doc.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <div className="p-4 flex justify-between items-center bg-gradient-to-b from-white to-teal-50">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => toggleDocumentVisibility(doc.id, doc.visible)}
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

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Upload New Document</h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                disabled={isUploading}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-teal-200 rounded-xl p-8 text-center bg-teal-50 transition-all duration-300 hover:border-teal-300">
                <FaFileAlt className="text-5xl text-teal-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-3">
                  {isUploading ? "Uploading..." : "Drag and drop files here or"}
                </p>
                <label className={`inline-block bg-teal-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-teal-600 transition-all duration-200 shadow-md hover:shadow-lg ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isUploading ? "Uploading..." : "Browse Files"}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFileUpload(file);
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
  );
};

export default DocumentsSection;