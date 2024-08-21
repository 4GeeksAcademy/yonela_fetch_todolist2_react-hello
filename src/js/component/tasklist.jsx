import React from 'react';

const TaskList = ({ tasks, removeTask }) => {
    // Si no hay tareas, mostrar mensaje
    if (tasks.length === 0) {
        return <div>No tiene tareas.</div>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}> {/* Usa el ID de la tarea como clave */}
                    {task.label}
                    <button style={{ border: 'none', backgroundColor: 'white', float: 'right' }} className='delete-icon ' onClick={() => removeTask(task.id)}>x</button> {/* Pasa el ID de la tarea */}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;

