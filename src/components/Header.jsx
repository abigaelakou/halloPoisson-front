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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Dropdown, Image } from 'react-bootstrap';

function Header({ onMenuClick }) {
  return (
    <>
      <header className="topbar">
        <div className="container-xxl">
          <div className="navbar-header">
            <div className="d-flex align-items-center gap-2">
              <div className="topbar-item">
                <button
                  type="button"
                  className="button-toggle-menu"
                  onClick={onMenuClick}
                >
                  <iconify-icon
                    icon="iconamoon:menu-burger-horizontal"
                    className="fs-22"
                  />
                </button>
              </div>
            </div>

            <div className="dropdown topbar-item">
              <a
                type="button"
                className="topbar-button"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    width="32"
                    src="assets/images/users/user2.png"
                    alt="avatar-3"
                  />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">Bienvenue Admin!</h6>
                <a className="dropdown-item" href="pages-profile.html">
                  <i className="bx bx-user-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Profile</span>
                </a>

                <div className="dropdown-divider my-1"></div>
                <a
                  className="dropdown-item text-danger"
                  href="auth-signin.html"
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
}
export default Header;
