import React from 'react';
import './Container.css';
import UploadedFile from './UploadedFile';
import SelectFile from './SelectFile';
function Container(){ 



    return (
    <div className="container">
        <h1>Upload File</h1>
        <UploadedFile />
        <SelectFile />
        <h2>OR</h2>
        

    </div>
    );
}


export default Container; 