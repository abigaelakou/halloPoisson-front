/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 15/04/2025 - 07:46:24
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 15/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si pas de token, redirige vers la connexion
    return <Navigate to="/connexion" replace />;
  }

  // Si connecté, affichage du contenu protégé
  return children;
};

export default ProtectedRoute;
