/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 15/04/2025 - 07:49:48
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 15/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);

      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const messages = error.response.data.errors;
        const firstError = messages
          ? Object.values(messages)[0][0]
          : 'Erreur de validation';
        setErreur(firstError);
      } else {
        setErreur('Une erreur est survenue');
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center">
                {' '}
                <div>
                  <img
                    src="assets/images/logoN.jpg"
                    className="logo-lg"
                    alt="logo"
                    style={{ maxWidth: '150px' }}
                  />{' '}
                </div>{' '}
                Connectez - vous pour continuer{' '}
              </h3>{' '}
              {erreur && <div className="alert alert-danger"> {erreur} </div>}{' '}
              <form onSubmit={handleConnexion}>
                <div className="mb-3">
                  <label> Email </label>{' '}
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>{' '}
                <div className="mb-3">
                  <label> Mot de passe </label>{' '}
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>{' '}
                <button type="submit" className="btn btn-warning">
                  Se connecter{' '}
                </button>{' '}
              </form>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
};

export default Connexion;
