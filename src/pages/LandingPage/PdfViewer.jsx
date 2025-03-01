
import React from 'react'
export const Viewer = ({ fileUrl }) => (
    <iframe
        src={fileUrl}
        width="100%"
        height="600px"
        title="PDF Viewer"
        style={{ border: "none" }}
    ></iframe>
);


const PdfViewer = () => {
  return (
    <div>
      <Viewer fileUrl="https://fitbuddy-storage-bucket.s3.ap-south-1.amazonaws.com/pdfs/1740824023390-Sem1Result.pdf" />;
    </div>
  )
}

export default PdfViewer;
