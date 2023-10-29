import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  taskstate: [],
  server: true,
};

const initializeStateFromLocalStorage = (state) => {
   console.log(localStorage.getItem("localtasks"));
  const storedState = localStorage.getItem("localtasks");
  if (storedState) {
    state.taskstate = JSON.parse(storedState);
  }
  
};

const fetchtask = (state, { payload }) => {
 
  if(state.server)
    state.taskstate = payload;
};

const addtask = (state, { payload }) => {
  state.taskstate = [...state.taskstate, payload];
  localStorage.setItem("localtasks", JSON.stringify(state.taskstate));
};

const updatetask = (state, { payload }) => {
  state.taskstate = state.taskstate.map((task) => {
    if (task._id == payload._id) return payload;
    return task;
  });
  localStorage.setItem("localtasks", JSON.stringify(state.taskstate));
};

const deletetask = (state, { payload }) => {
  const updatedList = state.taskstate.filter((task) => {
    return task._id != payload;
  });
  state.taskstate = updatedList;
  localStorage.setItem("localtasks", JSON.stringify(state.taskstate));
};

const updateDb = (state, { payload }) => {
  state.server = payload;
  initializeStateFromLocalStorage(state);
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateAction: updatetask,
    addAction: addtask,
    fetchAction: fetchtask,
    deleteAction: deletetask,
    dbAction: updateDb,
  },
});

export const { addAction, fetchAction, deleteAction, updateAction, dbAction } =
  taskSlice.actions;

export default taskSlice.reducer;
