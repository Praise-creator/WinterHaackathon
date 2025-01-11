import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./UploadPage.css";

function Button({ file, onFileUpload }) {
  const [message, setMessage] = React.useState(""); // Success/Error messages

  const reRoute = useNavigate();
  
  // Handle file upload when button is clicked
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Add file to formData

    reRoute('/form');
    try {
      // Send the file to the backend
      const response = await axios.post("http://localhost:5000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message); // Display success message

      // Pass the file name to the parent component (or another component)
      if (onFileUpload) {
        onFileUpload(file.name); // Send the file name to the parent
      }

    } catch (error) {
      setMessage("File upload failed. Please try again.");
      console.error(error);
    }
   
  };

  return (
      <div className="button" onClick={handleFileUpload}>Upload</div>

  );
}

export default Button;
