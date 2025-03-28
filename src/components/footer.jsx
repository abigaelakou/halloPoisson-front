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
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <script> document.write(new Date().getFullYear()) </script> 2025
              tout droit réservé{' '}
              <iconify-icon
                icon="iconamoon:heart-duotone"
                className="fs-18 align-middle text-danger"
              ></iconify-icon>
              <a href="#" className="fw-bold footer-text" target="_blank">
                @ HalloPoisson{' '}
              </a>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </footer>{' '}
    </>
  );
};
export default Footer;
