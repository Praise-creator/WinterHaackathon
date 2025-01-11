import React, { useState } from "react";
import axios from "axios";
import "./UploadPage.css";

function SelectFile() {
  const [file, setFile] = useState(null); // State to store the selected file
  const [message, setMessage] = useState(""); // State for success/error messages

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Save the selected file to state
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data

    try {
      const response = await axios.post("http://localhost:5000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage("File upload failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fileInput">
      <input
        type="file"
        id="selectFileInput"
        name="selectFileInput"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleFileUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SelectFile;
