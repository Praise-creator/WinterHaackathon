import React from 'react';
import './UploadPage.css';
import UploadedFile from './UploadedFile';
import SelectFile from './SelectFile';
import DragAndDrop from './DragAndDrop';
import Button from './Button';
function Container(){ 



    return (
    <div className='outter-container'>
    <div className="container">
        <h1>Upload File</h1>
        <UploadedFile />
        <SelectFile />
        <h2>OR</h2>
        <DragAndDrop />
        <Button />
        </div> 
    </div>
    );
}


export default Container; 