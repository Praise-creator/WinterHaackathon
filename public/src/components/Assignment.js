import React from "react";
import './Form.css';
 
const Assignment = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    console.log(today);
    return(
       
        <div className="assignment"> 
            <input type='text' defaultValue={"Molecular Visualization Project"} />
            <input type='date' defaultValue={formattedDate} />
            <input type='number' defaultValue={3} />
             </div>
      
    );
};

export default Assignment;
