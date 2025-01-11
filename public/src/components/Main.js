import React from "react";
import './Home.css';

function Main(){
    return(<div className="main">
        <h1 className="mainTitle">Stay on Top of Your Deadlines</h1>
        <div className="mainBody"></div>
            <p>Do you struggle to keep track of all your assignment deadlines? Our Assignment Organizer makes it easy.</p>
            <ul>
                <li><strong>Google Calendar Integration</strong>: Sync your tasks effortlessly.</li>
                <li><strong>Drag-and-Drop Uploads</strong>: Manage your files quickly.</li>
                <li><strong>Automatic Reminders</strong>: Never miss a deadline again.</li>
            </ul>
             <p>Take control of your academic life with ease and focus on what truly matters.</p>
        
    </div>);
}; 

export default Main;