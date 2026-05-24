const BASE = '/api/todos';

export const fetchTodos = () => fetch(BASE).then(r => r.json());

export const createTodo = (title) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then(r => r.json());

export const toggleTodo = (id) =>
  fetch(`${BASE}/${id}`, { method: 'PATCH' }).then(r => r.json());

export const deleteTodo = (id) =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(r => r.json());
