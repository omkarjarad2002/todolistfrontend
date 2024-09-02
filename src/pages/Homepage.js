import AllTasks from "./AllTasks";
import Newtask from "./Newtask";
import Sidebar from "./Sidebar";

const Homepage = ({ searchTerm }) => {
  console.log(searchTerm);
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = month + "/" + date.getDate() + "/" + date.getFullYear();

  let time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return (
    <>
      <div className="homepage bg-gray-100">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="full_info_page ">
          <h1> Date : {day}</h1>
          <p>Time : {time}</p>
          <Newtask />
          <AllTasks searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
