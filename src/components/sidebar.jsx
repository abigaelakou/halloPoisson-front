/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 21/03/2025 - 08:52:19
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 21/03/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React from 'react';

function Sidebar() {
  return (
    <div className="main-nav">
      <div className="logo-box">
        <a href="#" className="logo-dark">
          <img src="assets/images/logoN.jpg" className="logo-lg" alt="logo" />
        </a>
      </div>
      <button
        type="button"
        className="button-sm-hover"
        aria-label="Show Full Sidebar"
      >
        <iconify-icon
          icon="iconamoon:arrow-left-4-square-duotone"
          className="button-sm-hover-icon"
        />
      </button>
      <div className="scrollbar" data-simplebar>
        <ul className="navbar-nav" id="navbar-nav">
          <li className="nav-item mt-4">
            <a className="nav-link" href="/">
              <span className="nav-icon">
                <iconify-icon icon="iconamoon:home-duotone" />
              </span>
              <span className="nav-text text-black">Tableau de bord</span>
            </a>
          </li>
          <li className="menu-title text-black">Apps</li>
          <li className="nav-item">
            <a
              className="nav-link menu-arrow"
              href="#sidebarGestionnaire"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarGestionnaire"
            >
              <span className="nav-icon">
                <iconify-icon icon="iconamoon:lock-duotone" />
              </span>
              <span className="nav-text text-black">Gestionnaire</span>
            </a>
            <div className="collapse" id="sidebarGestionnaire">
              <ul className="nav sub-navbar-nav">
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/formAddUser">
                    Ajouter Gestionnaire
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/listUser">
                    Liste Gestionnaires
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link menu-arrow"
              href="#sidebarEcommerce"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarEcommerce"
            >
              <span className="nav-icon">
                <iconify-icon icon="iconamoon:shopping-bag-duotone" />
              </span>
              <span className="nav-text text-black">Commerce</span>
            </a>
            <div className="collapse" id="sidebarEcommerce">
              <ul className="nav sub-navbar-nav">
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/formFishType">
                    Enregistrer Type Poisson
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/listTypeFish">
                    Liste Type Poisson
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/formAddFish">
                    Enregistrer Poisson
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/listFish">
                    Liste des Poissons
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link menu-arrow"
              href="#sidebarClient"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarClient"
            >
              <span className="nav-icon">
                <iconify-icon icon="iconamoon:lock-duotone" />
              </span>
              <span className="nav-text text-black">Clients</span>
            </a>
            <div className="collapse" id="sidebarClient">
              <ul className="nav sub-navbar-nav">
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/listCustomer">
                    Liste Clients
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link text-black" href="/listOrder">
                    Liste Commandes
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
