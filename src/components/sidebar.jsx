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
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Sidebar() {
  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="btn btn-warning d-md-none m-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileSidebar"
        aria-controls="mobileSidebar"
      >
        <iconify-icon icon="iconamoon:menu-burger-horizontal-duotone" width="24" />
      </button>

      {/* Sidebar Desktop */}
      <div className="main-nav d-none d-md-block vh-100 bg-white border-end" style={{ width: '250px' }}>
        <SidebarContent />
      </div>

      {/* Sidebar Mobile */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
        <div className="offcanvas-header bg-warning">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body p-0 bg-white">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}

function SidebarContent() {
  const location = useLocation();
  
  return (
    <div className="scrollbar p-3" data-simplebar>
      <div className="logo-box mb-4 text-center">
        <a href="#" className="logo-dark">
          <img
            src="assets/images/logoN.jpg"
            className="logo-lg"
            alt="logo"
            style={{ maxWidth: '150px' }}
          />
        </a>
      </div>
      <ul className="navbar-nav" id="navbar-nav">
        <li className="nav-item mb-3">
          <a
            className={`nav-link d-flex align-items-center ${location.pathname === '/Dashboard' ? 'active' : ''}`}
            href="/Dashboard"
          >
            <iconify-icon icon="iconamoon:home-duotone" width="20" />
            <span className="ms-3 text-black">Tableau de bord</span>
          </a>
        </li>
        <li className="menu-title text-black fw-bold mt-3">Apps</li>

        <MenuGroup
          id="sidebarGestionnaire"
          title="Gestionnaire"
          icon="iconamoon:lock-duotone"
          links={[
            { href: '/formAddUser', label: 'Ajouter Gestionnaire' },
            { href: '/listUser', label: 'Liste Gestionnaires' },
          ]}
          location={location}
        />

        <MenuGroup
          id="sidebarEcommerce"
          title="Commerce"
          icon="iconamoon:shopping-bag-duotone"
          links={[
            { href: '/formAddFish', label: 'Enregistrer Poisson' },
            { href: '/listFish', label: 'Liste Poisson' },
            { href: '/formAddVariant', label: 'Enregistrer Variant' },
            { href: '/listVariant', label: 'Liste des Variants' },
          ]}
          location={location}
        />

        <MenuGroup
          id="sidebarClient"
          title="Clients"
          icon="iconamoon:lock-duotone"
          links={[
            { href: '/listCustomer', label: 'Liste Clients' },
            { href: '/listOrder', label: 'Liste Commandes' },
          ]}
          location={location}
        />
      </ul>
    </div>
  );
}

function MenuGroup({ id, title, icon, links, location }) {
  const isActiveGroup = links.some(link => link.href === location.pathname);

  return (
    <li className="nav-item">
      <a
        className={`nav-link menu-arrow d-flex align-items-center ${isActiveGroup ? 'active' : ''}`}
        href={`#${id}`}
        data-bs-toggle="collapse" 
        role="button"
        aria-expanded={isActiveGroup ? 'true' : 'false'}
        aria-controls={id}
      >
        <iconify-icon icon={icon} width="20" />
        <span className="ms-2 text-black">{title}</span>
      </a>
      <div className={`collapse ${isActiveGroup ? 'show' : ''}`} id={id}>
        <ul className="nav flex-column ms-4 mt-2">
          {links.map((link, idx) => (
            <li key={idx} className="sub-nav-item">
              <a
                className={`sub-nav-link d-block py-1 ${location.pathname === link.href ? 'active' : ''}`}
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default Sidebar;
