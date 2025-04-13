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
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="btn btn-primary d-md-none m-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileSidebar"
        aria-controls="mobileSidebar"
      >
        <iconify-icon
          icon="iconamoon:menu-burger-horizontal-duotone"
          width="24"
        />
      </button>

      {/* Sidebar for Desktop */}
      <div
        className="main-nav d-none d-md-block bg-light vh-100"
        style={{ width: '250px' }}
      >
        <SidebarContent />
      </div>

      {/* Sidebar Offcanvas for Mobile */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body p-0">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}

function SidebarContent() {
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
          <a className="nav-link d-flex align-items-center" href="/">
            <iconify-icon icon="iconamoon:home-duotone" width="20" />
            <span className="ms-2 text-black">Tableau de bord</span>
          </a>
        </li>
        <li className="menu-title text-black fw-bold mt-3">Apps</li>

        {/* Gestionnaire Menu */}
        <MenuGroup
          id="sidebarGestionnaire"
          title="Gestionnaire"
          icon="iconamoon:lock-duotone"
          links={[
            { href: '/formAddUser', label: 'Ajouter Gestionnaire' },
            { href: '/listUser', label: 'Liste Gestionnaires' },
          ]}
        />

        {/* Commerce Menu */}
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
        />

        {/* Client Menu */}
        <MenuGroup
          id="sidebarClient"
          title="Clients"
          icon="iconamoon:lock-duotone"
          links={[
            { href: '/listCustomer', label: 'Liste Clients' },
            { href: '/listOrder', label: 'Liste Commandes' },
          ]}
        />
      </ul>
    </div>
  );
}

function MenuGroup({ id, title, icon, links }) {
  return (
    <li className="nav-item">
      <a
        className="nav-link menu-arrow d-flex align-items-center"
        href={`#${id}`}
        data-bs-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls={id}
      >
        <iconify-icon icon={icon} width="20" />
        <span className="ms-2 text-black">{title}</span>
      </a>
      <div className="collapse" id={id}>
        <ul className="nav flex-column ms-3">
          {links.map((link, idx) => (
            <li key={idx} className="sub-nav-item">
              <a
                className="sub-nav-link text-black d-block py-1"
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
