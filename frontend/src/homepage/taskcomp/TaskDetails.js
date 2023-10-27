import React, { useState } from "react";
import "./TaskDetails.css";
import { Checkbox, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import Snackbarcomp from "./sharedComp/Snackbar";
import { useDispatch } from "react-redux";
import { deleteAction, updateAction } from "../../redux/taskSlice";

const TaskDetails = ({ taskdata}) => {
  const { title, status, description, _id } = taskdata;
  console.log(taskdata, "hi");
  const [isEditable, setIsEditable] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(taskdata.status);
  const [updatedTitle, setUpdatedtitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const dispatch = useDispatch();

  const handleTaskStatusUpdate = () => {
    setUpdatedStatus(!updatedStatus);
    dispatch(
      updateAction({
        _id,
        title: updatedTitle,
        description: updatedDescription,
        status: !updatedStatus,
      })
    );
  };

  const HandleTaskStatus = async (e) => {
    await axios
      .put("http://localhost:5000/update", {
        _id,
        taskStatus: !updatedStatus,
        title,
        description,
      })
      .then((res) => {
        if (res.status == 200) handleTaskStatusUpdate();
        else {
          console.log(res);
        }
      })
      .catch((e) => console.log(e, "cant"));
  };

  const HandleSetEditState = () => {
    setIsEditable(true);
  };

  const HandleSave = () => {
    setIsEditable(false);
  };

  const HandleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/deletetask/${_id}`);
      if (res.status == 200) dispatch(deleteAction(_id));
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(updatedStatus)
  return (
    <>
      <div className={updatedStatus?`container checked `:`container`}>
        <div className="checkmark">
          <Checkbox
            sx={{
              color: "black",
              width: "40px",
              height: "40px",
              "& .MuiSvgIcon-root": { fontSize: 40, color: "green" },
            }}
            onChange={HandleTaskStatus}
            checked={updatedStatus}
          />
        </div>
        {isEditable ? (
          <div className="newTask">
            <Input
              sx={{ fontSize: "2rem", margin: "10px" }}
              fullWidth
              placeholder="Task"
              variant="standard"
              value={updatedTitle}
              onChange={(e) => setUpdatedtitle(e.target.value)}
            />
            <Input
              sx={{ fontSize: "1rem", margin: "10px" }}
              placeholder="Description"
              fullWidth
              variant="standard"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </div>
        ) : (
          <div className="taskdetails">
            <div className="title">{title}</div>
            <div className="desc">{description}</div>
          </div>
        )}
        <div className="editdeleteIcon">
          <DeleteIcon
            onClick={() => {
              HandleDelete();
            }}
            sx={{
              color: "white",
              margin: "5px",
              padding: "5px",
              cursor: "pointer",
            }}
          />
          {isEditable ? (
            <DoneIcon
              onClick={HandleSave}
              sx={{
                color: "white",
                margin: "5px",
                padding: "5px",
                cursor: "pointer",
                fontSize: 40,
              }}
            />
          ) : (
            <EditIcon
              onClick={HandleSetEditState}
              sx={{
                color: "white",
                margin: "5px",
                padding: "5px",
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
