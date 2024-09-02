import { CalendarIcon, HomeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);

  const handleClick = async () => {
    try {
      const data = await axios.get("http://localhost:4000/getAllTasks");
      setTasks(data.data);
      setShowTasks(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleDoubleClick = () => {
    setShowTasks(false);
    window.location.reload();
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/tasks/${taskId}`
      );
      if (res.status == 201) {
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-800 bg-gray-800 px-6 py-6">
      <h1 className="font-bold text-gray-100"> To Do...</h1>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <li key="Tasks">
                <a
                  href="#"
                  className={classNames(
                    true
                      ? "bg-gray-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <HomeIcon
                    aria-hidden="true"
                    className={classNames(
                      true
                        ? "text-indigo-600"
                        : "text-gray-400 group-hover:text-indigo-600",
                      "h-6 w-6 shrink-0"
                    )}
                  />
                  Tasks
                </a>
              </li>
              <li key="Completed">
                <a
                  href="#"
                  className={classNames(
                    false
                      ? "bg-gray-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <CalendarIcon
                    aria-hidden="true"
                    className={classNames(
                      false
                        ? "text-indigo-600"
                        : "text-gray-400 group-hover:text-indigo-600",
                      "h-6 w-6 shrink-0"
                    )}
                  />
                  <button
                    className="text-gray-400"
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                  >
                    Completed
                  </button>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        {showTasks && (
          <ul role="list" className="divide-y divide-gray-100">
            {tasks
              .filter((task) => task.isCompleted)
              .map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-400">
                        {task.taskTitle}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {task.taskDate}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="cursor-pointer"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
