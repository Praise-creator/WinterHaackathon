import React from 'react';
import './UploadPage.css';

function UploadedFile({fileName}){ 
    return (
        <div className='fileLayout'>
            <div className='white-background'> 
                <img src="./pdf.png"/> 
                <h3>{fileName}</h3>
                <img src="./tick-mark.png" />
                </div>
        </div>
    );
}

export default UploadedFile;