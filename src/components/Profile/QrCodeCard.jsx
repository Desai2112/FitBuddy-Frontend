import React, { useState } from "react";
import { FaQrcode, FaDownload } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

const QrCodeCard = ({ userId, data }) => {
  const [isQrHovered, setIsQrHovered] = useState(false);
  const userHistoryUrl = `http://localhost:5173/user/history/${userId}`;

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

  return (
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
  );
};

export default QrCodeCard;