import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Addtask.css";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Snackbarcomp from "./sharedComp/Snackbar";
import { addAction } from "../../redux/taskSlice";

let msgtype = "success";

const Addtask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const dispatch = useDispatch();




  

  const HandleAddTask = async () => {
    if(!title){
      setSnackbarMsg("Title cannot be empty")
      setsnackbarOpen(true)
      msgtype = "error";
     
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/addtask", {
        task: { title, description },
      });
      
      if (res.status == 200) {
        dispatch(addAction({ title, description, status: false,_id:res.data._id}));
        msgtype = "success";
        setSnackbarMsg(res.data.message);
        setsnackbarOpen(true);
        
      }
    } catch (e) {
      msgtype = "error";
      setSnackbarMsg(e.message);
      setsnackbarOpen(true);
    }
  };
  return (
    <div className="newTaskContainer">
      <div className="newTask">
        <Input
          sx={{ fontSize: "2rem", margin: "10px", color: "#222831" }}
          fullWidth
          placeholder="Task"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          sx={{ fontSize: "1.2rem", margin: "10px" }}
          placeholder="Description"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="addBtn" onClick={HandleAddTask}>
        <AddIcon
          sx={{
            color: "#53354A",
            margin: "5px",
            padding: "5px",
            cursor: "pointer",
            fontSize: "40px",
          }}
        />
      </div>
      <Snackbarcomp
        message={snackbarMsg}
        type={msgtype}
        isOpen={snackbarOpen}
        setOpen={setsnackbarOpen}
      />
    </div>
  );
};

export default Addtask;
