import api from './api.js'

export const getAll = () => api.get('/projeto')
export const getById = (id) => api.get(`/projeto/${id}`)
export const save = (projeto) => api.post('/projeto', projeto)
export const remove = (id) => api.delete(`/projeto/${id}`)
export const update = (id, projetoUpdate) => api.put(`/projeto/${id}`, projetoUpdate)
export const updateEditando = (id) => api.patch(`/projeto/${id}/editando`)