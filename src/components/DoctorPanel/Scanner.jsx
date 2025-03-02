import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axios';

const Scanner = () => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
        setError(null);
      }
    } catch (err) {
      setError('Error accessing camera: ' + err.message);
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setScanning(false);
    }
  };

  const resetScan = () => {
    stopCamera();
    setPatientData(null);
    setError(null);
    startCamera();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleStartScan = () => {
    startCamera();
  };

  // For demo purposes, let's simulate scanning a patient ID
  const simulateScan = async () => {
    try {
      // In a real app, this would come from QR code scanning
      const mockPatientId = "123";
      const response = await axiosInstance.get(`/api/patients/${mockPatientId}`);
      setPatientData(response.data);
      stopCamera();
    } catch (err) {
      setError('Failed to fetch patient data');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Profile Scanner</h1>
        {!scanning && patientData && (
          <button
            onClick={resetScan}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            New Scan
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        {scanning ? (
          <div className="max-w-md mx-auto">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 border-2 border-teal-500 rounded-lg animate-pulse" />
              {/* Temporary button for demo */}
              <button
                onClick={simulateScan}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-teal-500 text-white rounded-lg"
              >
                Simulate Scan
              </button>
            </div>
            <p className="text-center mt-4 text-gray-600">
              Position the QR code within the frame to scan
            </p>
          </div>
        ) : patientData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">
                  {patientData.name?.charAt(0) || 'P'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {patientData.name || 'John Doe'}
                </h2>
                <p className="text-gray-600">{patientData.email || 'patient@example.com'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Personal Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Age</dt>
                      <dd className="text-gray-900">{patientData.age || '30'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Gender</dt>
                      <dd className="text-gray-900">{patientData.gender || 'Male'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Blood Type</dt>
                      <dd className="text-gray-900">{patientData.bloodType || 'O+'}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Medical History</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Allergies</dt>
                      <dd className="text-gray-900">
                        {patientData.allergies?.join(', ') || 'None'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Conditions</dt>
                      <dd className="text-gray-900">
                        {patientData.conditions?.join(', ') || 'None'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Recent Appointments</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {patientData.recentAppointments?.length > 0 ? (
                  <ul className="space-y-3">
                    {patientData.recentAppointments.map((apt) => (
                      <li key={apt.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-900">{apt.reason}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(apt.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          apt.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {apt.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No recent appointments</p>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <button
              onClick={handleStartScan}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Start Scanning
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Scanner; 