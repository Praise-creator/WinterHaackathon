import React  from "react";
import './UploadPage.css';

function SelectFile(){
    return(
        <div className="fileInput">
         
            <input type="file" id="selectFileInput" name = "selectFileInput" accept =".doc, .pdf" /> 
        </div>
    );
};

export default SelectFile;