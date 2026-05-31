import api from './api';

export const reportService = {
  generate: async (params) => {
    return await api.get('/reports/generate.php', { params });
  },
  getSummary: async () => {
    return await api.get('/reports/summary.php');
  },
  getDashboardStats: async () => {
    return await api.get('/reports/dashboard.php');
  },
};
