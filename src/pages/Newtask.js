import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Newtask() {
  const [startDate, setStartDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");

  const handleName = (e) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(startDate, taskName);
    try {
      const res = await axios.post("http://localhost:4000/task", {
        taskTitle: taskName,
        taskDate: startDate,
        isCompleted: false,
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="form">
        <div className="newtask">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Add New Task
          </label>
          <div className="mt-2">
            <input
              id="tasttitle"
              onChange={handleName}
              value={taskName}
              name="tasktitle"
              type="text"
              placeholder=""
              className="input_task input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
          <p className="py-2">Select Date </p>
          <div className="d_task_container">
            <div className="datepicker">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="addNewTaskBtn">
              <button
                type="submit"
                onClick={handleSubmit}
                className="add_btn rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
