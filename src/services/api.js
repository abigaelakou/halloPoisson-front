/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 12/04/2025 - 10:51:09
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
