import React, { useDebugValue } from "react";
import './Home.css'; 
import { useNavigate } from 'react-router-dom';

const UploadButton = () => { 

    const reRoute = useNavigate();

    const handleClick = () => {
        reRoute('/upload');  // Navigate to '/upload' route when button is clicked
      };




    return(<div className="uploadButton"> 
        <h1 onClick={handleClick} className="buttonText">Upload Doc Here</h1>
    </div>);
};

export default UploadButton; 