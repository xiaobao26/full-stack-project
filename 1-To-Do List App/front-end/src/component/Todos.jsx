import React from 'react';
import { Todo } from './Todo';

export const Todos = ({ todos, toggleComplete, deleteTask }) => {
    return (
        <>
            {todos.map((todo, index) => (
                <Todo key={index} task={todo} toggleComplete={toggleComplete} deleteTask={deleteTask} />
            ))}
        </>
    )
}
