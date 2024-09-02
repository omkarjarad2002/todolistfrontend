import axios from "axios";
import React, { useEffect, useState } from "react";

function AllTasks({ searchTerm }) {
  console.log(searchTerm);
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    try {
      const data = await axios.get("http://localhost:4000/getAllTasks");

      console.log(data.data);
      if (data) {
        setTasks(data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleClick = async (taskID) => {
    try {
      const res = await axios.post("http://localhost:4000/taskCompleted", {
        id: taskID,
        isCompleted: true,
      });
    } catch (error) {
      alert(error);
    }

    window.location.reload();
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const filteredTasks = searchTerm
    ? tasks.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks;

  return (
    <>
      <div className="newtask">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Assigned
        </label>
        {filteredTasks
          .filter((task) => !task.isCompleted)
          .map((task) => (
            <fieldset>
              <legend className="sr-only">Notifications</legend>
              <div className="space-y-5">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      onClick={() => handleClick(task._id)}
                      aria-describedby="comments-description"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      {task.taskTitle}
                    </label>
                    <p id="comments-description" className="text-gray-500">
                      {task.taskDate.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          ))}
      </div>
    </>
  );
}

export default AllTasks;
