import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  taskstate: [],
};

const fetchtask = (state, { payload }) => {
  state.taskstate = payload;
};

const addtask = (state, { payload }) => {

  state.taskstate =[...state.taskstate,payload]
  
};

const updatetask = (state, { payload }) => {

  
  state.taskstate = state.taskstate.map((task)=>{
    if(task._id==payload._id)
      return payload
    return task
  })

};

const deletetask = (state, { payload }) => {
  const updatedList = state.taskstate.filter((task) => {
    return task._id != payload;
  });
  state.taskstate = updatedList;
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateAction: updatetask,
    addAction: addtask,
    fetchAction: fetchtask,
    deleteAction: deletetask,
  },
});

export const { addAction, fetchAction, deleteAction, updateAction } =
  taskSlice.actions;

export default taskSlice.reducer;
