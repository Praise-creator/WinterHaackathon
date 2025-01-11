import React, {useState} from 'react';

import UploadedFile from './UploadedFile';
import SelectFile from './SelectFile';
import DragAndDrop from './DragAndDrop';
import Button from './Button';


function Container(){ 

    const [fileName, setFileName] = useState(null);

  // Function to update the file name in state
    const handleFileUpload = (file) => {
    setFileName(file.name);
    };

    return (
    <div className='outter-container'>
        <div className="container">
        <h1>Upload File</h1>
        <UploadedFile fileName={fileName} />
        <DragAndDrop handleFileUpload={handleFileUpload} />
        <Button fileName={fileName}  handleFileUpload={handleFileUpload} />
        </div> 
    </div>
     
    );
};


export default Container; 