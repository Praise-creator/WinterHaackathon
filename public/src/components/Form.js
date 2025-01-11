import React from 'react'; 
import Assignment from './Assignment';

import './Form.css';

const Form = () =>{ 

    return(
        <div>
            <h1 className='title'>Assignments</h1>
            <div className="assignmentBox">
            <Assignment /> 
            <Assignment /> 
            <Assignment /> 
            <Assignment /> 
          </div>
        </div>
    );
};

export default Form; 