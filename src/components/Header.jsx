/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 24/02/2025 - 13:24:04
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 24/02/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Header = () => {
  const navigate = useNavigate(); //  useNavigate pour la redirection

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      // Après la déconnexion, redirige vers la page de connexion
      navigate('/auth/login'); // Utilisation de navigate pour rediriger
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <>
      {/* Header Principal */}
      <header className="topbar py-2 bg-light border-bottom">
        <div className="container-xxl">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="flex-grow-1 text-center d-lg-block d-none">
              <h4 className="mb-0 fw-semibold text-dark mt-2">
                BIENVENUE SUR VOTRE TABLEAU DE BORD
              </h4>
            </div>

            {/* Menu Utilisateur */}
            <div className="dropdown">
              <a
                type="button"
                className="d-flex align-items-center"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle"
                  width="32"
                  height="32"
                  src="assets/images/users/user2.png"
                  alt="avatar-3"
                />
              </a>

              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="page-header-user-dropdown"
              >
                <h6 className="dropdown-header">Bienvenue Admin!</h6>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-user-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Profile</span>
                </a>
                <div className="dropdown-divider my-1"></div>
                <a
                  className="dropdown-item text-danger"
                  href="#!"
                  onClick={handleLogout}
                >
                  <i className="bx bx-log-out fs-18 align-middle me-1"></i>
                  <span className="align-middle">Déconnexion</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
