import api from './api';

export const divorceService = {
  getAll: async (params = {}) => {
    return await api.get('/divorce/index.php', { params });
  },
  getById: async (id) => {
    return await api.get(`/divorce/show.php?id=${id}`);
  },
  create: async (data) => {
    return await api.post('/divorce/create.php', data);
  },
  update: async (id, data) => {
    return await api.put(`/divorce/update.php?id=${id}`, data);
  },
  delete: async (id) => {
    return await api.delete(`/divorce/delete.php?id=${id}`);
  },
  generateCertificate: async (id) => {
    return await api.get(`/divorce/certificate.php?id=${id}`);
  },
};
