import { MenuItem, Select } from "@mui/material";
import TaskDetails from "./TaskDetails";
import "./TaskList.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAction } from "../../redux/taskSlice";


// const tasks = [
//   { _id: 1, title: "task1", description: "descritption1", status: 0 },
//   { _id: 2, title: "task2", description: "descritption2", status: 1 },
//   { _id: 3, title: "task3", description: "descritption3", status: 1 },
//   { _id: 4, title: "task4", description: "descritption4", status: 0 },
// ];

const TaskList = () => {

  

  const [status, setStatus] = useState(3);
 // const [tasks, setTasks] = useState([]);
  const [tasklist, setTasklist] = useState([]);

  const dispatch = useDispatch();
  const taskstatearray = useSelector((state) => state.taskSlice.taskstate);
  




  
  
  const fettch = () => {
    axios.get("http://localhost:5000/gettask").then((res) => {
     // setTasks(res.data.reverse());
      // setTasklist(res.data.reverse());
      dispatch(fetchAction(res.data.reverse()));
    }).catch((e)=>{console.log(e.message)});
  };

  useEffect(() => {
    
    fettch()
    
  }, []);
  
   useEffect(() => {
     
     handleUpdateList(status);
   }, [taskstatearray]);


  const handleUpdateList = (option) => {
    let updatedtasklist = [];

    updatedtasklist = taskstatearray.filter((task) => {
    
      return task.status == option;
    });

    if (option != 3) setTasklist(() => updatedtasklist);
    else setTasklist(() => taskstatearray);
  };




  
  
  return (
    <div className="ListContainer">
      <div className="statusMenu">
        <Select
          sx={{ width: "150px", backgroundColor: "white", marginY: "20px" }}
          value={status}
          onChange={(e) => {
            setStatus(() => e.target.value);
            handleUpdateList(e.target.value);
          }}
        >
          <MenuItem value={3}>All</MenuItem>
          <MenuItem value={1}>Completed</MenuItem>
          <MenuItem value={0}>Pending</MenuItem>
        </Select>
      </div>
      <div className="arraycont">
        {tasklist &&
          tasklist.map((item, idx) => {
            return (
              <li key={item._id}>
                <TaskDetails taskdata={item} />
              </li>
            );
          })}
      </div>
    </div>
  );
};

export default TaskList;
