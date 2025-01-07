import React  from "react";
import './SelectFile.css';

function SelectFile(){
    return(
        <div className="fileInput">
         
            <input type="file" id="selectFileInput" name = "selectFileInput" accept =".doc, .pdf" /> 
        </div>
    );
};

export default SelectFile;