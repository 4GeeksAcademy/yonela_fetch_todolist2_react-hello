import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            addTask({ label: task, done: false });
            setTask('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Nueva tarea"
                className='text-input'
            />

        </form>
    );
};

export default TaskForm;
