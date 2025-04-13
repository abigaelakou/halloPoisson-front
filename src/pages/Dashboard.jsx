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

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalGestionnaires: 0,
    totalVentes: 0,
    nouveauxClients: [],
  });

  const fetchDashboardData = async () => {
    try {
      const [usersRes, salesRes, newClientsRes] = await api.all([
        api.get('/admin/stats'),
        api.get('/admin/stats/sales'),
        api.get('/admin/users/new'),
      ]);

      setStats({
        totalClients: usersRes.data.totalClients,
        totalGestionnaires: usersRes.data.totalGestionnaires,
        totalVentes: salesRes.data.totalVentes,
        nouveauxClients: newClientsRes.data.nouveauxClients,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="container-xxl">
      {/* TITRE */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="mb-0 fw-semibold">Finance</h4>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#">Tableau de bord</a>
              </li>
              <li className="breadcrumb-item active">Finance</li>
            </ol>
          </div>
        </div>
      </div>

      {/* STATISTIQUES */}
      <div className="row g-3">
        <StatCard
          title="Nombre de Clients"
          value={stats.totalClients}
          icon="iconamoon:credit-card-duotone"
          color="info"
        />
        <StatCard
          title="Total Vente"
          value={stats.totalVentes}
          icon="iconamoon:3d-duotone"
          color="success"
        />
        <StatCard
          title="Nombre Gestionnaire"
          value={stats.totalGestionnaires}
          icon="iconamoon:3d-duotone"
          color="warning"
        />
      </div>

      {/* LISTE DES CLIENTS */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="d-flex card-header justify-content-between align-items-center">
              <h4 className="card-title text-danger">
                LISTE DES NOUVEAUX CLIENTS
              </h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive table-card">
                <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                  <thead className="bg-light bg-opacity-50 thead-sm">
                    <tr>
                      <th>Nom & Prénoms</th>
                      <th>Contact</th>
                      <th>Date création compte</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.nouveauxClients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>
                          {new Date(client.created_at).toLocaleDateString(
                            'fr-FR'
                          )}{' '}
                          <small className="text-muted">
                            {new Date(client.created_at).toLocaleTimeString(
                              'fr-FR'
                            )}
                          </small>
                        </td>
                        <td>
                          <span
                            className={`badge ${client.is_active ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} p-1`}
                          >
                            {client.is_active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {stats.nouveauxClients.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Aucun client récent
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour les cartes statistiques
const StatCard = ({ title, value, icon, color }) => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h3 className="mb-0 fw-bold mb-2">{value}</h3>
            <p className="text-muted">{title}</p>
          </div>
          <div className="avatar-lg d-inline-block me-1">
            <span
              className={`avatar-title bg-${color}-subtle text-${color} rounded-circle`}
            >
              <iconify-icon icon={icon} className="fs-32" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
