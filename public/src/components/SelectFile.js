import React, { useState } from "react";
import axios from "axios";
import "./UploadPage.css";
import { useNavigate } from "react-router-dom";  // Updated import for React Router v6

function SelectFile() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploadedData, setUploadedData] = useState(null);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      });

      if (response.status === 200) {
        alert("File uploaded successfully!");
        setUploadedData(response.data); // Set the data from response

        // Redirect to the form page with uploaded data (using useNavigate)
        navigate('/form', { state: { tasks: response.data } }); // Pass the data to the next page
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("File upload failed. Please try again.");
    }
  };

  return (
    <div className="fileInput">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SelectFile;
