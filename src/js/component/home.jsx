import React, { useState, useEffect } from 'react';
import TaskForm from './taskform';
import TaskList from './tasklist';
import "../../styles/index.css";




const Home = () => {
	const [tasks, setTasks] = useState([]);

	const fetchTasks = () => {
		fetch('https://playground.4geeks.com/todo/users/Yonela')  // Asegúrate de que esta URL sea correcta
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text(); // Obtener la respuesta como texto primero
			})
			.then(text => {
				try {
					const data = JSON.parse(text); // Intentar analizar el texto como JSON
					if (data.todos && Array.isArray(data.todos)) {
						setTasks(data.todos);
					} else {
						console.error('Unexpected data format:', data);
						setTasks([]); // Establecer tareas como vacío en caso de formato inesperado
					}
				} catch (error) {
					console.error('Error al analizar la respuesta JSON:', error);
					setTasks([]); // Establecer tareas como vacío en caso de error de análisis
				}
			})
			.catch(error => console.error('Error al cargar las tareas:', error));
	};

	useEffect(() => {
		fetchTasks(); // Llama a la función para obtener las tareas
	}, []);

	const addTask = (task) => {
		const taskToSend = {
			label: task.label,
			is_done: task.done
		};

		fetch('https://playground.4geeks.com/todo/todos/Yonela', {  // Usa POST para agregar tareas
			method: 'POST',
			mode: 'cors',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(taskToSend)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Error al agregar la tarea: ' + response.statusText);
				}
				return response.json();
			})
			.then(data => {
				console.log('Tarea agregada:', data);
				// Obtener las tareas actualizadas después de agregar una nueva tarea
				fetchTasks(); // Llama a la función que obtiene las tareas
			})
			.catch(error => console.error('Error al sincronizar tareas:', error));
	};

	const removeTask = (taskId) => {
		fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Error al eliminar la tarea: ' + response.statusText);
				}
				return response.text(); // Obtener la respuesta como texto
			})
			.then(text => {
				// Si la respuesta está vacía, simplemente actualiza el estado
				if (!text) {
					console.log('Tarea eliminada');
					const updatedTasks = tasks.filter(task => task.id !== taskId);
					setTasks(updatedTasks);
				} else {
					// Intenta analizar el texto como JSON si no está vacío
					try {
						JSON.parse(text); // Intentar analizar el texto como JSON
						console.log('Tarea eliminada');

						// Actualizar el estado de las tareas
						const updatedTasks = tasks.filter(task => task.id !== taskId);
						setTasks(updatedTasks);
					} catch (error) {
						console.error('Error al analizar la respuesta JSON:', error);
						// Manejar el caso en que la respuesta no sea JSON
					}
				}
			})
			.catch(error => console.error('Error al sincronizar tareas:', error));
	};



	const clearAllTasks = () => {
		fetch('https://playground.4geeks.com/todo/users/Yonela', {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					setTasks([]); // Vacía la lista en el frontend
					console.log('Tareas limpiadas');
				} else {
					console.error('Error al eliminar tareas:', response.status);
				}
			})
			.catch(error => console.error('Error al eliminar tareas:', error));
	};

	return (
		<div className="app-container">
			<div className="form-container">
				<div className="heading">Tareas de Yonela</div>
				<TaskForm addTask={addTask} />
				<TaskList tasks={tasks} removeTask={removeTask} />
				<button onClick={clearAllTasks} className="button">
					Limpiar todas las tareas
				</button>
			</div>
		</div>
	);
};

export default Home;
