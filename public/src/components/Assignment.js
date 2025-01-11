import React from "react";
import './Form.css';

const Assignment = ({ task, onInputChange, index }) => {
  return (
    <div className="assignment">
      <input
        type="text"
        value={task.name}
        onChange={(e) => onInputChange(e, index, "name")}
      />
      <input
        type="date"
        value={task.date}
        onChange={(e) => onInputChange(e, index, "date")}
      />
      <input
        type="number"
        value={task.duration}
        onChange={(e) => onInputChange(e, index, "duration")}
      />
      <input
        type="date"
        placeholder="Start Date"
        onChange={(e) => onInputChange(e, index, "startDate")}
      />
      <input
        type="date"
        placeholder="End Date"
        onChange={(e) => onInputChange(e, index, "endDate")}
      />
    </div>
  );
};

export default Assignment;
