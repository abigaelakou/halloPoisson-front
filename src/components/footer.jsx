/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 11/02/2025 - 09:04:01
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 11/02/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
const Footer = () => {
  return (
    <>
      <footer className="footer bg-light py-3">
        <div className="container">
          <div className="row justify-content-center">
            {/* Contenu Footer */}
            <div className="col-12 col-md-8 text-center">
              <p>
                <script> document.write(new Date().getFullYear()) </script> 2025{' '}
                tout droit réservé{' '}
                <iconify-icon
                  icon="iconamoon:heart-duotone"
                  className="fs-18 align-middle text-danger"
                ></iconify-icon>{' '}
                <a href="#" className="fw-bold footer-text" target="_blank">
                  @ HalloPoisson{' '}
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
