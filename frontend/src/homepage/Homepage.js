import React from 'react';
import Task from './taskcomp/TaskList';
import "./Homepage.css"
import Addtask from './taskcomp/Addtask';
import Switch from './taskcomp/sharedComp/Switch';


const Homepage = () => {
    return (
        <div className='main2'>
            <Switch/>
            <Addtask/>
            <Task/>
        </div>
    );
};

export default Homepage;