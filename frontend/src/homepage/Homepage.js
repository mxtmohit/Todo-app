import React from 'react';
import Task from './taskcomp/TaskList';
import "./Homepage.css"
import Addtask from './taskcomp/Addtask';

const Homepage = () => {
    return (
        <div className='main2'>
            
            <Addtask/>
            <Task/>
        </div>
    );
};

export default Homepage;