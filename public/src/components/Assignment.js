import React from "react";
import './Form.css';

const Assignment = () => {
    return(
       
        <div className="assignment"> 
            <input type='text' defaultValue={"Molecular Visualization Project"} />
            <input type='date' defaultValue={"2025-01-10"} />
            <input type='number' defaultValue={3} />
             </div>
      
    );
};

export default Assignment;