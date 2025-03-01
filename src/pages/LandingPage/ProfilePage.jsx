import React, { useState, useEffect } from "react";
import { FaUser, FaQrcode } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import MedicalReportSection from "../../components/Profile/MedicalReportSection";
import PersonalInfoSection from "../../components/Profile/PersonalInfoSection";
import MedicalInfoSection from "../../components/Profile/MedicalInfoSection";
import EmergencyContactSection from "../../components/Profile/EmergencyContactSection";

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const [editing, setEditing] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [formData, setFormData] = useState({
        dateOfBirth: "",
        gender: "",
        height: "",
        weight: "",
        bloodType: "",
        allergies: [],
        medicalConditions: [],
        medications: [],
        emergencyContact: {
            name: "",
            relationship: "",
            phone: ""
        }
    });

    // Report-related state variables
    const [reportName, setReportName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // Report-related handlers
    const handleFileWithName = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type !== "application/pdf") {
                toast.error("Only PDF files are allowed");
                return;
            }
            setSelectedFile(file);
        }
    };

    const addFileWithName = () => {
        if (reportName && selectedFile) {
            const fileWithName = {
                file: selectedFile,
                customName: reportName
            };
            setUploadedFiles([...uploadedFiles, fileWithName]);
            setReportName("");
            setSelectedFile(null);
            toast.success("Report added successfully");
        }
    };

    // Fetch user profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/auth/profile");
                setUser(response.data.user);
                setProfile(response.data.profile);
                setQrCode(response.data.qrCode);

                // Update form data with existing profile data
                if (response.data.profile) {
                    const profileData = response.data.profile;
                    setFormData({
                        dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString().split("T")[0] : "",
                        gender: profileData.gender || "",
                        height: profileData.height || "",
                        weight: profileData.weight || "",
                        bloodType: profileData.bloodType || "",
                        allergies: profileData.allergies || [],
                        medicalConditions: profileData.medicalConditions || [],
                        medications: profileData.medications || [],
                        emergencyContact: {
                            name: profileData.emergencyContact?.name || "",
                            relationship: profileData.emergencyContact?.relationship || "",
                            phone: profileData.emergencyContact?.phone || ""
                        }
                    });

                    if (profileData.medicalReports) {
                        setUploadedFiles(profileData.medicalReports);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle array field changes (allergies, medications, conditions)
    const handleArrayItemChange = (field, index, value) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData({ ...formData, [field]: updatedArray });
    };

    // Add new item to an array field
    const addArrayItem = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ""]
        });
    };

    // Remove item from an array field
    const removeArrayItem = (field, index) => {
        const updatedArray = [...formData[field]];
        updatedArray.splice(index, 1);
        setFormData({ ...formData, [field]: updatedArray });
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type === "application/pdf");

        if (validFiles.length !== files.length) {
            toast.error("Only PDF files are allowed");
        }

        setUploadedFiles([...uploadedFiles, ...validFiles]);
    };

    // Remove uploaded file
    const removeFile = (index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setUploadedFiles(updatedFiles);
    };

    // Handle form submission for profile updates
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const apiFormData = new FormData();

            // Add all form fields
            Object.keys(formData).forEach(key => {
                if (key === "emergencyContact") {
                    apiFormData.append(key, JSON.stringify(formData[key]));
                } else if (Array.isArray(formData[key])) {
                    apiFormData.append(key, JSON.stringify(formData[key]));
                } else {
                    apiFormData.append(key, formData[key]);
                }
            });

            // Add files
            uploadedFiles.forEach((fileObj) => {
                if (fileObj.file instanceof File) {
                    apiFormData.append('medicalReports', fileObj.file);
                    apiFormData.append('reportNames', fileObj.customName || '');
                } else if (fileObj.url) {
                    // For existing files, just pass the reference
                    apiFormData.append("existingReports", fileObj.url);
                }
            });

            const response = await axios.put("/api/profile/update", apiFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProfile(response.data.profile);
            toast.success("Profile updated successfully");
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    // Toggle QR code display
    const toggleQrCode = () => {
        setShowQR(!showQR);
    };

    if (loading && !profile) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Generate display name for a file
    const getFileName = (file) => {
        if (file instanceof File) {
            return file.name;
        } else if (file.name) {
            return file.name;
        } else if (file.url) {
            const parts = file.url.split('/');
            return parts[parts.length - 1];
        }
        return "Unknown file";
    };

    return (
        <div className="min-h-screen pt-20 pb-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                    {/* Profile Header */}
                    <div className="bg-primary text-white p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-primary mr-4">
                                    <FaUser className="text-3xl" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{user?.name || "User"}</h1>
                                    <p className="text-sm opacity-80">{user?.email}</p>
                                    <p className="mt-1 text-xs bg-white text-primary rounded-full px-2 py-1 inline-block">
                                        {user?.role === "doctor" ? "Doctor" : "Patient"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={toggleQrCode}
                                    className="flex items-center justify-center gap-2 bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition"
                                >
                                    <FaQrcode />
                                    {showQR ? "Hide QR Code" : "Show QR Code"}
                                </button>

                                {!editing ? (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setEditing(false)}
                                        className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    {showQR && (
                        <div className="p-6 border-b border-gray-200 flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-4">Your Profile QR Code</h2>
                            <p className="text-gray-600 mb-4 text-center max-w-md">
                                Show this QR code to your doctor. When scanned, it will provide them with your medical information.
                            </p>
                            {qrCode ? (
                                <div className="p-4 border-2 border-primary rounded-lg mb-2">
                                    <img src={qrCode} alt="Profile QR Code" className="w-48 h-48" />
                                </div>
                            ) : (
                                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                                    <p className="text-gray-500">QR Code not available</p>
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                                This QR code contains your unique identifier for medical professionals.
                            </p>
                        </div>
                    )}

                    {/* Profile Content */}
                    {editing ? (
                        <form onSubmit={handleSubmit} className="p-6">
                            <h2 className="text-xl font-semibold mb-6">Edit Your Profile</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <PersonalInfoSection 
                                    formData={formData}
                                    handleChange={handleChange}
                                    editing={editing}
                                />

                                {/* Medical Information */}
                                <MedicalInfoSection
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleArrayItemChange={handleArrayItemChange}
                                    addArrayItem={addArrayItem}
                                    removeArrayItem={removeArrayItem}
                                    editing={editing}
                                    profile={profile}
                                />

                                {/* Medical Reports Upload */}
                                <MedicalReportSection
                                    editing={editing}
                                    uploadedFiles={uploadedFiles}
                                    handleFileUpload={handleFileUpload}
                                    removeFile={removeFile}
                                    reportName={reportName}
                                    setReportName={setReportName}
                                    handleFileWithName={handleFileWithName}
                                    addFileWithName={addFileWithName}
                                    selectedFile={selectedFile}
                                    getFileName={getFileName}
                                />

                                {/* Emergency Contact */}
                                <EmergencyContactSection
                                    formData={formData}
                                    handleChange={handleChange}
                                    editing={editing}
                                    profile={profile}
                                />
                            </div>

                            {editing && (
                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition"
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            )}
                        </form>
                    ) : (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <PersonalInfoSection 
                                    formData={formData}
                                    profile={profile} 
                                    editing={editing}
                                />

                                {/* Medical Information */}
                                <MedicalInfoSection
                                    profile={profile}
                                    editing={editing}
                                />

                                {/* Medical Reports Upload */}
                                <MedicalReportSection
                                    editing={editing}
                                    uploadedFiles={uploadedFiles}
                                    getFileName={getFileName}
                                />

                                {/* Emergency Contact */}
                                <EmergencyContactSection
                                    profile={profile}
                                    editing={editing}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;