import axios from "axios";
const apiUrl = "http://localhost:5000/api/todos";

export function getTodos() {
	return axios.get(apiUrl);
}

export function addTodo(todo) {
	return axios.post(apiUrl, todo);
}

export function updateTodo(id, todo) {
	return axios.put(apiUrl + "/" + id, todo);
}

export function deleteTodo(id) {
	return axios.delete(apiUrl + "/" + id);
}

export function getUser() {
	return axios.get("http://localhost:5000/auth/google");
}
