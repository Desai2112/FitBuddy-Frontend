import React, { useState } from "react";
import { Calendar, User, Phone, Mail, MapPin, Heart, FileText, Upload, Plus, X, AlertCircle } from "lucide-react";

const CreateProfilePage = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    gender: "",
    contactInfo: {
      phone: "",
      email: "",
      alternatePhone: ""
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    healthInfo: {
      bloodType: "",
      allergies: "",
      medications: "",
      medicalConditions: "",
      height: "",
      weight: ""
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      alternatePhone: ""
    },
    insurance: {
      provider: "",
      policyNumber: "",
      groupNumber: ""
    }
  });

  const [documents, setDocuments] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: getDocumentType(file.name)
    }));
    setDocuments(prev => [...prev, ...newFiles]);
  };

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
    return "other";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return Math.round(bytes / (1024 * 1024) * 10) / 10 + " MB";
  };

  const removeDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Documents:", documents);
    // Here you would typically send the data to your backend
    alert("Profile creation form submitted! Check console for data.");
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step 
                ? 'bg-teal-500 border-teal-500 text-white' 
                : 'bg-white border-gray-300 text-gray-500'
            }`}>
              {step}
            </div>
            {step < 5 && (
              <div className={`flex-1 h-1 mx-2 ${
                currentStep > step ? 'bg-teal-500' : 'bg-gray-300'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Personal</span>
        <span>Contact</span>
        <span>Address</span>
        <span>Health</span>
        <span>Documents</span>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <User className="w-5 h-5 text-teal-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange(null, 'dateOfBirth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange(null, 'gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Phone className="w-5 h-5 text-teal-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.contactInfo.phone}
              onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.contactInfo.email}
              onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alternate Phone Number
            </label>
            <input
              type="tel"
              value={formData.contactInfo.alternatePhone}
              onChange={(e) => handleInputChange('contactInfo', 'alternatePhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="+1 (555) 987-6543"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Emergency Contact</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Name *
            </label>
            <input
              type="text"
              value={formData.emergencyContact.name}
              onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship *
            </label>
            <input
              type="text"
              value={formData.emergencyContact.relationship}
              onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="Spouse, Parent, Sibling, etc."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.emergencyContact.phone}
              onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alternate Phone
            </label>
            <input
              type="tel"
              value={formData.emergencyContact.alternatePhone}
              onChange={(e) => handleInputChange('emergencyContact', 'alternatePhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="+1 (555) 987-6543"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <MapPin className="w-5 h-5 text-teal-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Address Information</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleInputChange('address', 'street', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="123 Main Street, Apt 4B"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="New York"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province *
              </label>
              <input
                type="text"
                value={formData.address.state}
                onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="NY"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP/Postal Code *
              </label>
              <input
                type="text"
                value={formData.address.zipCode}
                onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="10001"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                value={formData.address.country}
                onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="United States"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Heart className="w-5 h-5 text-teal-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Health Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Type
            </label>
            <select
              value={formData.healthInfo.bloodType}
              onChange={(e) => handleInputChange('healthInfo', 'bloodType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.healthInfo.height}
              onChange={(e) => handleInputChange('healthInfo', 'height', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="170"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.healthInfo.weight}
              onChange={(e) => handleInputChange('healthInfo', 'weight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="70"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies
            </label>
            <textarea
              value={formData.healthInfo.allergies}
              onChange={(e) => handleInputChange('healthInfo', 'allergies', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="List any known allergies..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Medications
            </label>
            <textarea
              value={formData.healthInfo.medications}
              onChange={(e) => handleInputChange('healthInfo', 'medications', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="List current medications and dosages..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical Conditions
            </label>
            <textarea
              value={formData.healthInfo.medicalConditions}
              onChange={(e) => handleInputChange('healthInfo', 'medicalConditions', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="List any chronic conditions or medical history..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-5 h-5 text-teal-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Insurance Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider
            </label>
            <input
              type="text"
              value={formData.insurance.provider}
              onChange={(e) => handleInputChange('insurance', 'provider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="Blue Cross Blue Shield, Aetna, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number
            </label>
            <input
              type="text"
              value={formData.insurance.policyNumber}
              onChange={(e) => handleInputChange('insurance', 'policyNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="Policy number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Number
            </label>
            <input
              type="text"
              value={formData.insurance.groupNumber}
              onChange={(e) => handleInputChange('insurance', 'groupNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="Group number"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Upload className="w-5 h-5 text-teal-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Medical Documents</h3>
        </div>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-teal-400 bg-teal-50' 
              : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop files here, or{' '}
            <label className="text-teal-600 cursor-pointer hover:text-teal-700">
              browse
              <input
                type="file"
                multiple
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
          </p>
        </div>
        
        {documents.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Uploaded Documents</h4>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center flex-1">
                    <FileText className="w-5 h-5 text-gray-400 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(doc.size)} • {doc.type}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="ml-3 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderContactInfo();
      case 3:
        return renderAddressInfo();
      case 4:
        return renderHealthInfo();
      case 5:
        return renderDocuments();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Create Your Profile</h1>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {renderStepIndicator()}
          
          {renderCurrentStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors"
              >
                Create Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;