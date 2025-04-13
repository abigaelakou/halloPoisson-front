/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 13/04/2025 - 11:08:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 13/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Table from 'react-bootstrap/Table';
import { Pagination, Button, Modal } from 'react-bootstrap';
import moment from 'moment'; // Pour la gestion des dates

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('pending');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const getOrdersAndCustomers = async () => {
      try {
        // Récupérer la liste des commandes
        const ordersResponse = await api.get('/admin/orders', {
          params: {
            page: currentPage,
            search: searchTerm, // Recherche
          },
        });
        setOrders(ordersResponse.data.data || []);
        setTotalPages(ordersResponse.data.total_pages || 1);

        // Récupérer la liste des clients
        const customersResponse = await api.get('/admin/users');
        setCustomers(customersResponse.data.data || []);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    getOrdersAndCustomers();
  }, [currentPage, searchTerm]);

  // Fonction pour obtenir le nom du client à partir de son ID
  const getCustomerName = (userId) => {
    const customer = customers.find((c) => c.id === userId);
    return customer ? customer.name : 'Inconnu';
  };

  // Fonction pour supprimer une commande
  const handleDelete = async (orderId) => {
    try {
      await api.delete(`/api/orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
    }
  };

  // Fonction pour ouvrir la modale d'annulation
  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  // Fonction pour annuler une commande
  const handleCancelOrder = async () => {
    try {
      await api.post(`/admin/orders/${selectedOrder.id}/cancel`);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: 'cancelled' }
            : order
        )
      );
      setShowCancelModal(false);
    } catch (error) {
      console.error('Erreur lors de l’annulation:', error);
    }
  };

  // Fonction pour ouvrir la modale de changement de statut de livraison
  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.delivery_status || 'pending');
    setDeliveryDate(order.delivery_date || '');
    setShowStatusModal(true);
  };

  // Fonction pour mettre à jour le statut de livraison
  const handleUpdateStatus = async () => {
    try {
      await api.put(`/admin/orders/${selectedOrder.id}/delivery`, {
        delivery_status: newStatus,
        delivery_date: deliveryDate || null,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? {
                ...order,
                delivery_status: newStatus,
                delivery_date: deliveryDate,
              }
            : order
        )
      );
      setShowStatusModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de livraison:', error);
    }
  };

  // Fonction de recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Réinitialiser la page à 1 après une recherche
  };

  // Fonction pour formater les dates
  const formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : 'Non définie';
  };

  return (
    <>
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Tableau </h4>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Liste </a>
          </li>
          <li className="breadcrumb-item active"> Commandes </li>
        </ol>
      </div>
      <div>
        <h2 className="text-center">
          <u> Liste des Commandes </u>
        </h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par client ou commande..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <Table striped bordered hover responsive className="text-center mt-4">
          <thead className="bg-light bg-opacity-50 thead-sm">
            <tr>
              <th scope="col">Nom du Client</th>
              <th scope="col">Adresse</th>
              <th scope="col">Numéro de Commande</th>
              <th scope="col">Type de Paiement</th>
              <th scope="col">Date de Livraison Estimée</th>
              <th scope="col">Date de Livraison</th>
              <th scope="col">Statut</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{getCustomerName(order.user_id)}</td>
                  <td>{order.address}</td>
                  <td>{order.order_no}</td>
                  <td>{order.payment_type}</td>
                  <td>{formatDate(order.estimated_delivery_date)}</td>
                  <td>{formatDate(order.delivery_date)}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button
                      onClick={() => openCancelModal(order)}
                      variant="warning"
                      size="sm"
                      className="me-2"
                    >
                      Annuler
                    </Button>

                    <Button
                      onClick={() => openStatusModal(order)}
                      variant="info"
                      size="sm"
                    >
                      Livraison
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Aucune commande disponible</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Modale pour annuler la commande */}
      <Modal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation d'annulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir annuler la commande #
          {selectedOrder?.order_no} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Non
          </Button>
          <Button variant="warning" onClick={handleCancelOrder}>
            Oui, annuler
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale pour changer le statut de livraison */}
      <Modal
        show={showStatusModal}
        onHide={() => setShowStatusModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier la livraison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Statut de livraison</label>
            <select
              className="form-control"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">En attente</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Date de livraison</label>
            <input
              type="date"
              className="form-control"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Annuler
          </Button>
          <Button variant="info" onClick={handleUpdateStatus}>
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListOrders;
