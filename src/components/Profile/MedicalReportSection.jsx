import React from 'react';
import { FaFilePdf, FaTrash } from 'react-icons/fa';

const MedicalReportSection = ({ 
  editing, 
  uploadedFiles, 
  handleFileUpload, 
  removeFile, 
  reportName, 
  setReportName, 
  handleFileWithName,
  addFileWithName,
  selectedFile,
  getFileName
}) => {
  // View mode - just show uploaded documents
  if (!editing) {
    return (
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2 border-b pb-2 mb-4">
          <FaFilePdf className="text-primary" /> Medical Reports
        </h3>
        
        {uploadedFiles.length > 0 ? (
          <div className="mt-3 border rounded-md p-2">
            <h4 className="text-sm font-medium mb-2">Uploaded Documents</h4>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <FaFilePdf className="text-red-500 mr-2" />
                    <span className="truncate max-w-xs">
                      {file.customName || getFileName(file)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No medical reports uploaded</p>
        )}
      </div>
    );
  }
  
  // Edit mode - show upload functionality and documents
  return (
    <div>
      <label className="block text-gray-700 mb-2">Medical Reports (PDF)</label>
      
      {/* Named file upload option */}
      <div className="mb-3 border-2 border-dashed border-gray-300 rounded-md p-4">
        <div className="flex flex-col space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Report Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter report name"
              value={reportName || ""}
              onChange={(e) => setReportName(e.target.value)}
            />
          </div>

          <label className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center">
              <FaFilePdf className="text-primary text-xl mb-2" />
              <span className="text-sm font-medium">Upload PDF document</span>
              <span className="text-xs text-gray-500 mt-1">Click to browse files</span>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileWithName}
            />
          </label>

          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-md mt-2 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={addFileWithName}
            disabled={!reportName || !selectedFile}
          >
            Add Report
          </button>
        </div>
      </div>

      {/* Display uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-3 border rounded-md p-2">
          <h4 className="text-sm font-medium mb-2">Uploaded Documents</h4>
          <ul className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <FaFilePdf className="text-red-500 mr-2" />
                  <span className="truncate max-w-xs">{file.customName || getFileName(file)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicalReportSection;