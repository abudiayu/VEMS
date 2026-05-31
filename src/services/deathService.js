import api from './api';

export const deathService = {
  getAll: async (params = {}) => {
    return await api.get('/death/index.php', { params });
  },
  getById: async (id) => {
    return await api.get(`/death/show.php?id=${id}`);
  },
  create: async (data) => {
    return await api.post('/death/create.php', data);
  },
  update: async (id, data) => {
    return await api.put(`/death/update.php?id=${id}`, data);
  },
  delete: async (id) => {
    return await api.delete(`/death/delete.php?id=${id}`);
  },
  generateCertificate: async (id) => {
    return await api.get(`/death/certificate.php?id=${id}`);
  },
};
