import React from 'react'; 
import Main from './Main';
import UploadButton from './UploadButton';
import './Home.css';
import { Outlet } from 'react-router-dom';
 
function Home(){ 
  


    return(
    <div className='homeUI'>
        <div className='header'>
            <h1 className='headerBold'>Assignment</h1>
            <h1 className='headerLight'>Tracker</h1>
            </div>
        <Main /> 
        <UploadButton /> 
        <h6>Developed By: Fariha, Praise, Nana-Afia, Samantha  </h6>
        <Outlet />
    </div>);
}; 

export default Home;