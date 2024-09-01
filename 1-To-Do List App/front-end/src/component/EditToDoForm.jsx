import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditToDoForm = ({ editTask }) => {
    const params = useParams();
    console.log("id:", params.taskId);
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleInputValue = (e) => {
        setValue(e.target.value);
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        editTask(params.taskId, value);
        setValue("");
        navigate("/tasks");
    }

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <form className='TodoForm' onSubmit={handleSubmission}>
                <input type="text" value={value} className='todo-input' placeholder='what is the task today?' onChange={handleInputValue} />
                <button type="submit" className='todo-btn'>Update Task</button>
            </form>
        </div>

    )
}
