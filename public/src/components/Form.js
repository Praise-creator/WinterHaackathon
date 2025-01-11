import React from 'react'; 
import Assignment from './Assignment';

import './Form.css';

import axios from "axios";

const Form = ({ location }) => {
  const [taskData, setTaskData] = useState(location?.state?.tasks || []);  // Receive tasks from location state or fallback to empty array
  const [error, setError] = useState("");

  const handleInputChange = (e, index, field) => {
    const newTaskData = [...taskData];
    newTaskData[index][field] = e.target.value;
    setTaskData(newTaskData);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        tasks: taskData,
      });

      if (response.status === 200) {
        window.location.href = "/calendar"; // Or use React Router's redirect
      }
    } catch (error) {
      setError("Failed to create events. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="title">Assignments</h1>
      <div className="assignmentBox">
        {taskData.map((task, index) => (
          <Assignment
            key={index}
            task={task}
            onInputChange={handleInputChange}
            index={index}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Form;
