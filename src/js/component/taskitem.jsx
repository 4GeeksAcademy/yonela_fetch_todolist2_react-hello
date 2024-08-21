import React, { useState } from 'react';

function TaskItem({ task, onDelete }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="task-item"
        >
            {task}
            {isHovered && (
                <span className="delete-icon" onClick={onDelete}>
                    &times;
                </span>
            )}
        </li>
    );
}

export default TaskItem;
