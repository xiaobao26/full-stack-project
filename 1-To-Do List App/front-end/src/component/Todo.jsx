import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Todo = ({ task,toggleComplete, deleteTask }) => {
    const navigate = useNavigate();
    return (
        <div className='Todo'>
            <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ''}`}>{task.task}</p>
            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/update/${task.id}`)}/>
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task.id)}/>
            </div>
        </div>
    )
}
