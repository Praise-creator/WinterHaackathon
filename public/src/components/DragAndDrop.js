import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadedFile from "./UploadedFile";

import './UploadPage.css';




function DragAndDrop({ handleFileUpload }) {
    const fileTypes = ["PDF"];
      const [file, setFile] = useState(null);
    
      const handleChange = (file) => {
        setFile(file);
        handleFileUpload(file);  // Call the function passed from parent to update file name
      };
    
    return (
        <div className = "dragDrop"> 
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <img src="fileIcon.svg" />
            <h3>Drag & Drop Files Here</h3>
        </div>

    );
}; 

export default DragAndDrop;

