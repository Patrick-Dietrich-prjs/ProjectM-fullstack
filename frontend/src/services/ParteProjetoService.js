import api from './api.js';

export const getAll = () => api.get('/parteprojeto');
export const getById = (id) => api.get(`/parteprojeto/${id}`);
export const save = (parteprojeto) => api.post('/parteprojeto', parteprojeto);
export const remove = (id) => api.delete(`/parteprojeto/${id}`);
export const update = (id, dadosUpdate) => api.put(`/parteprojeto/${id}`, dadosUpdate);
export const updateStatus = (id) => api.patch(`/parteprojeto/${id}/concluido`)
export const updateEditando = (id) => api.patch(`/parteprojeto/${id}/editando`)