import Switch from "@mui/material/Switch";
import React, { useDebugValue, useState } from "react";
import { useDispatch } from "react-redux";
import { dbAction } from "../../../redux/taskSlice";


const Switchk = () => {

    const dispatch=useDispatch()
    const [switchValue,setSwitchValue]=useState(true)
  

        const handleSwitch=(e)=>{
            setSwitchValue(!switchValue);
            console.log(e.target.value,"value")
            dispatch(dbAction(!e.target.value))
            
        }

        
  return (
    <div style={{backgroundColor:"white",textTransform:"uppercase",fontWeight:"600",borderRadius:"50px",padding:"5px",margin:"20px"}}>
     Server 
     <Switch value ={switchValue} onChange={handleSwitch} />
     Local Storage
    </div>
  );
};

export default Switchk;
