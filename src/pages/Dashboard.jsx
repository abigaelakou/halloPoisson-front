/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 19/02/2025 - 18:45:31
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 19/02/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/

const Dashboard = () => {
  return (
    <>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <h4 className="mb-0 fw-semibold"> Finance </h4>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#"> Tableau de bord </a>
                </li>
                <li className="breadcrumb-item active"> Finance </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className="mb-0 fw-bold mb-2">1000</h3>
                    <p className="text-muted">Nombre de Clients </p>
                    <span className="badge fs-12 badge-soft-success"></span>
                  </div>
                  <div>
                    <div className="avatar-lg d-inline-block me-1">
                      <span className="avatar-title bg-info-subtle text-info rounded-circle">
                        <iconify-icon
                          icon="iconamoon:credit-card-duotone"
                          className="fs-32"
                        ></iconify-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className="mb-0 fw-bold mb-2">4000 </h3>
                    <p className="text-muted">Total Vente </p>
                    <span className="badge fs-12 badge-soft-danger"></span>
                  </div>
                  <div>
                    <div className="avatar-lg d-inline-block me-1">
                      <span className="avatar-title bg-success-subtle text-success rounded-circle">
                        <iconify-icon
                          icon="iconamoon:3d-duotone"
                          className="fs-32"
                        ></iconify-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className="mb-0 fw-bold mb-2">6000 </h3>
                    <p className="text-muted">Nombre Gestionnaire </p>
                    <span className="badge fs-12 badge-soft-success"></span>
                  </div>
                  <div>
                    <div className="avatar-lg d-inline-block me-1">
                      <span className="avatar-title bg-warning-subtle text-warning rounded-circle">
                        <iconify-icon
                          icon="iconamoon:3d-duotone"
                          className="fs-32"
                        ></iconify-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* LISTE DES NOUVEAUX CLIENTS */}
          <div className="col-xxl-8">
            <div className="card">
              <div className="d-flex card-header justify-content-between align-items-center">
                <h4 className="card-title text-danger center">
                  LISTE DES NOUVEAUX CLIENTS
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive table-card">
                  <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                    <thead className="bg-light bg-opacity-50 thead-sm">
                      <tr>
                        <th scope="col">Nom & Prenoms</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Date création compte</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Adam M</td>
                        <td>0500000010</td>
                        <td>
                          20 Apr,24
                          <small className="text-muted">10:31:23 am</small>
                        </td>
                        <td>
                          <span className="badge bg-success-subtle text-success p-1">
                            Actif
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Alexa Newsome</td>
                        <td>0500000010</td>

                        <td>
                          18 Apr,24
                          <small className="text-muted">06:22:09 pm</small>
                        </td>
                        <td>
                          <span className="badge bg-success-subtle text-success p-1">
                            Actif
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Shelly Dorey</td>
                        <td>0500000010</td>

                        <td>
                          16 Apr,24
                          <small className="text-muted">05:09:58 pm</small>
                        </td>
                        <td>
                          <span className="badge bg-success-subtle text-success p-1">
                            Actif
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Fredrick Arnett</td>
                        <td>0500000010</td>

                        <td>
                          16 Apr,24
                          <small className="text-muted">10:21:25 am</small>
                        </td>
                        <td>
                          <span className="badge bg-success-subtle text-success p-1">
                            Actif
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Barbara Frink</td>
                        <td>0500000010</td>

                        <td>
                          12 Apr,24
                          <small className="text-muted">06:22:09 pm</small>
                        </td>
                        <td>
                          <span className="badge bg-success-subtle text-success p-1">
                            Actif
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title">Revenue Sources</h4>
                <div className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle arrow-none card-drop"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <iconify-icon
                      icon="iconamoon:menu-kebab-vertical-circle-duotone"
                      className="fs-20 align-middle text-muted"
                    ></iconify-icon>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a href="javascript:void(0);" className="dropdown-item">
                      Sales Report
                    </a>

                    <a href="javascript:void(0);" className="dropdown-item">
                      Export Report
                    </a>
                    <a href="javascript:void(0);" className="dropdown-item">
                      Profit
                    </a>

                    <a href="javascript:void(0);" className="dropdown-item">
                      Action
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div id="revenue-sources" className="apex-charts mb-2"></div>

                <div className="table-responsive mb-n1">
                  <table className="table table-nowrap table-borderless table-sm table-centered mb-0">
                    <thead className="bg-light bg-opacity-50 thead-sm">
                      <tr>
                        <th className="py-1">Sources</th>
                        <th className="py-1">Revenue</th>
                        <th className="py-1">Perc.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Online</td>
                        <td>$187,232</td>
                        <td>
                          48.63%
                          <span className="badge badge-soft-success ms-1">
                            2.5% Up
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Offline</td>
                        <td>$126,874</td>
                        <td>
                          36.08%
                          <span className="badge badge-soft-success ms-1">
                            8.5% Up
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Direct</td>
                        <td>$90,127</td>
                        <td>
                          23.41%
                          <span className="badge badge-soft-danger ms-1">
                            10.98% Down
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
