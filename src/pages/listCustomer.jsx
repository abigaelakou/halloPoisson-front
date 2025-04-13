/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 12/04/2025 - 15:57:45
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {
  Modal,
  Button,
  Form,
  Pagination,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import api from '../services/api';

const ListCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [customers, search]);

  const getCustomers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setCustomers(response.data.data || []);
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/custumers/${id}`);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await api.put(`/admin/custumes/${selectedCustomer.id}`, selectedCustomer);
      setShowModal(false);
      getCustomers(); // recharger la liste
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  const handleChange = (e) => {
    setSelectedCustomer({
      ...selectedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (query) => {
    setSearch(query);
    const lowerQuery = query.toLowerCase();
    const result = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery)
    );
    setFilteredCustomers(result);
    setCurrentPage(1); // Réinitialiser la pagination
  };

  const handleToggleStatus = async (id, isActive) => {
    try {
      const endpoint = isActive ? 'deactivate' : 'activate';
      await api.put(`/admin/users/${endpoint}/${id}`);
      getCustomers();
    } catch (error) {
      console.error('Erreur lors du changement de statut :', error);
    }
  };

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return (
    <>
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold">Tableau</h4>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#">Liste</a>
          </li>
          <li className="breadcrumb-item active">Clients</li>
        </ol>
      </div>

      <div>
        <h2 className="text-center">
          <u>Liste des Clients</u>
        </h2>

        {/* Champ de recherche */}
        <InputGroup className="mb-3 w-50 mx-auto">
          <FormControl
            placeholder="Rechercher par nom ou email"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>

        <Table striped bordered hover responsive className="text-center mt-4">
          <thead className="bg-light bg-opacity-50 thead-sm">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Points</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.loyalty_points}</td>
                  <td>
                    {customer.is_active ? 'Actif' : 'Inactif'}
                    <br />
                    <Button
                      variant={customer.is_active ? 'secondary' : 'success'}
                      size="sm"
                      className="mt-1"
                      onClick={() =>
                        handleToggleStatus(customer.id, customer.is_active)
                      }
                    >
                      {customer.is_active ? 'Désactiver' : 'Activer'}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-1"
                      onClick={() => handleEdit(customer)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Aucun client disponible</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="justify-content-center">
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx}
                active={idx + 1 === currentPage}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </div>

      {/* Modale d'édition */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedCustomer?.name || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={selectedCustomer?.email || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={selectedCustomer?.phone_number || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Points de fidélité</Form.Label>
              <Form.Control
                type="number"
                name="loyalty_points"
                value={selectedCustomer?.loyalty_points || 0}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListCustomer;
