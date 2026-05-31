import api from './api';

export const authService = {
  login: async (username, password) => {
    return await api.post('/auth/login.php', { username, password });
  },
  logout: async () => {
    try {
      await api.post('/auth/logout.php');
    } catch {
      // ignore
    }
    localStorage.removeItem('vems_user');
    localStorage.removeItem('vems_token');
  },
  changePassword: async (currentPassword, newPassword) => {
    return await api.post('/auth/change-password.php', {
      current_password: currentPassword,
      new_password: newPassword,
    });
  },
};
