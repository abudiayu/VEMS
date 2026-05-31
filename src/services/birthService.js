import api from './api';

export const birthService = {
  getAll: async (params = {}) => {
    return await api.get('/birth/index.php', { params });
  },
  getById: async (id) => {
    return await api.get(`/birth/show.php?id=${id}`);
  },
  create: async (data) => {
    return await api.post('/birth/create.php', data);
  },
  update: async (id, data) => {
    return await api.put(`/birth/update.php?id=${id}`, data);
  },
  delete: async (id) => {
    return await api.delete(`/birth/delete.php?id=${id}`);
  },
  generateCertificate: async (id) => {
    return await api.get(`/birth/certificate.php?id=${id}`);
  },
};
