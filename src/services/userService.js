import api from './api';

export const userService = {
  getAll: async () => {
    return await api.get('/users/index.php');
  },
  getById: async (id) => {
    return await api.get(`/users/show.php?id=${id}`);
  },
  create: async (data) => {
    return await api.post('/users/create.php', data);
  },
  update: async (id, data) => {
    return await api.put(`/users/update.php?id=${id}`, data);
  },
  delete: async (id) => {
    return await api.delete(`/users/delete.php?id=${id}`);
  },
  toggleStatus: async (id, status) => {
    return await api.patch(`/users/toggle-status.php?id=${id}`, { status });
  },
};
