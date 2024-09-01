import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleInputValue = (e) => {
        setValue(e.target.value);
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        addTodo(value);
        setValue("");
    }

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <form className='TodoForm' onSubmit={handleSubmission}>
                <input type="text" value={value} className='todo-input' placeholder='what is the task today?' onChange={handleInputValue} />
                <button type="submit" className='todo-btn' onClick={() => navigate("/tasks")}>Add Task</button>
                <Outlet />
            </form>
        </div>

    )
}
