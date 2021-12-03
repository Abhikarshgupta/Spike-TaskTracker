import React, { useState, useEffect } from "react";
import { Paper, TextField, Chip } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import { addTodo, getTodos, updateTodo, deleteTodo } from "../services/index";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [currentTodo, setCurrentTodo] = useState("");
	const [taskLengthLabel, setTaskLengthLabel] = useState("");
	const [editableItem, setEditableItem] = useState({});
	const [editTodo, setEditTodo] = useState({});
	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await getTodos();
				setTodos(data);
				setTaskLengthLabel(`${data.length} Tasks`);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, []);

	const handleChange = (e) => {
		console.log("here", e.target.value);
		setCurrentTodo(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const originalTodos = todos;
		try {
			const { data } = await addTodo({ todo: currentTodo });
			let todos = originalTodos;
			todos.push(data);
			setTodos(todos);
			setCurrentTodo("");
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (currentTodo) => {
		const originalTodos = todos;
		try {
			const todos = [...originalTodos];
			const index = todos.findIndex((Todo) => Todo._id === currentTodo);
			todos[index] = { ...todos[index] };
			todos[index].completed = !todos[index].completed;
			setTodos(todos);
			await updateTodo(currentTodo, {
				completed: todos[index].completed,
			});
		} catch (error) {
			setTodos(originalTodos);
			console.log(error);
		}
	};

	const handleDelete = async (currentTodo) => {
		const originalTodos = todos;
		try {
			const todos = originalTodos.filter((Todo) => Todo._id !== currentTodo);
			setTodos(todos);
			await deleteTodo(currentTodo);
		} catch (error) {
			setTodos(originalTodos);
			console.log(error);
		}
	};

	const handleEdit = async (currentTodo) => {
		console.log("currentTodd", currentTodo);
		setEditableItem({ id: currentTodo.id, editable: true });
		setEditTodo({ id: currentTodo.id, todo: currentTodo.currentTodo });
	};

	const onKeyDown = async (event) => {
		if (event.key === "Enter" || event.key === "Escape") {
			event.target.blur();
			const originalTodos = todos;
			try {
				const todos = [...originalTodos];
				const updatedTodo = todos.map((todo) => {
					if (todo._id === editTodo.id) {
						todo.todo = editTodo.todo;
					}
					return todo;
				});

				setTodos(updatedTodo);
				await updateTodo(editTodo.id, { todo: editTodo.todo });
			} catch (error) {
				setTodos(originalTodos);
				console.log(error);
			}

			setCurrentTodo("");
			setEditableItem();
		}
	};
	const onBlur = (event) => {
		console.log("asdfasdf", event.target.value);
		setCurrentTodo(event.target.value);
	};

	const handleEditChange = (id, e) => {
		setEditTodo({ id: id, todo: e.target.value });
	};

	return (
		<div className='App flex'>
			<Paper elevation={3} className='container'>
				<div className='headerContainer'>
					<div className='heading'>SPIKE Task List Manager</div>
					<Chip label={taskLengthLabel} color='primary' />
				</div>
				<form
					onSubmit={handleSubmit}
					className='flex'
					style={{ margin: "15px 0" }}>
					<TextField
						variant='outlined'
						size='small'
						style={{ width: "80%" }}
						value={currentTodo}
						required={true}
						onChange={handleChange}
						placeholder='Add New Task'
					/>
					<Button
						style={{ height: "40px", width: "25%" }}
						color='primary'
						variant='outlined'
						type='submit'>
						Add task
					</Button>
				</form>
				<div>
					{todos.map((todo) => (
						<Paper className='flex todo_container' key={todo._id}>
							<div className='item_container'>
								<Checkbox
									checked={todo.completed}
									onClick={() => handleUpdate(todo._id)}
									color='primary'
								/>
								{editableItem && editableItem.id === todo._id ? (
									<TextField
										variant='outlined'
										size='small'
										style={{ width: "80%" }}
										value={editTodo.todo}
										required={true}
										onChange={(e) => {
											handleEditChange(todo._id, e);
										}}
										id='EditTask'
										onKeyDown={onKeyDown}
										onBlur={onBlur}
									/>
								) : (
									<div
										className={todo.completed ? "todo line_through" : "todo"}>
										{todo.todo}
									</div>
								)}
							</div>
							<div>
								<Button
									onClick={() =>
										handleEdit({ id: todo._id, currentTodo: todo.todo })
									}
									color='primary'>
									Edit
								</Button>
								<Button
									onClick={() => handleDelete(todo._id)}
									color='secondary'>
									delete
								</Button>
							</div>
						</Paper>
					))}
				</div>
			</Paper>
		</div>
	);
};

export default TodoList;
