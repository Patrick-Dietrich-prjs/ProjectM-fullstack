import api from './api.js';

export const getAll = () => api.get('/todo');
export const getById = (id) => api.get(`/todo/${id}`);
export const save = (todo) => api.post('/todo', todo);
export const remove = (id) => api.delete(`/todo/${id}`);
export const update = (id, descricao) => api.put(`/todo/${id}`, descricao);
export const updateStatus = (id) => api.patch(`/todo/${id}/concluido`)