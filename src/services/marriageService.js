import api from './api';

export const marriageService = {
  getAll: async (params = {}) => {
    return await api.get('/marriage/index.php', { params });
  },
  getById: async (id) => {
    return await api.get(`/marriage/show.php?id=${id}`);
  },
  create: async (data) => {
    return await api.post('/marriage/create.php', data);
  },
  update: async (id, data) => {
    return await api.put(`/marriage/update.php?id=${id}`, data);
  },
  delete: async (id) => {
    return await api.delete(`/marriage/delete.php?id=${id}`);
  },
  generateCertificate: async (id) => {
    return await api.get(`/marriage/certificate.php?id=${id}`);
  },
};
