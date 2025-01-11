import React from 'react';
import './UploadPage.css';
import { useNavigate } from 'react-router-dom';


function Button(){ 
    const reRoute = useNavigate();
    const handleClick = () =>{
        reRoute('/form');
    }
    return(

        
        <div onClick={handleClick} className="button"> 
            <h3>Add</h3>
        </div>

    );
};


export default Button;