// src/components/FileUpload.jsx
import React, { useState } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const { uploadFile } = useFileUpload();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const filePath = `uploads/${file.name}`; // Path within the bucket
    const fileUrl = await uploadFile(file, filePath);
    setUploading(false);
    if (fileUrl) {
      setUploadedFileUrl(fileUrl);
      alert('File uploaded successfully!');
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="upload-button"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadedFileUrl && (
        <div className="uploaded-file">
          <p>Uploaded File:</p>
          <img src={uploadedFileUrl} alt="Uploaded" className="uploaded-image" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
