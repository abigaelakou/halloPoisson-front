/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 10/02/2025 - 16:49:20
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 10/02/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // URL de l'API

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

//Fonction d'ajout de poisson
export const addFish = async (fishData) => {
  const response = await api.post('/fishes', fishData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Fonction pour récupérer la liste des utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    throw error;
  }
};
