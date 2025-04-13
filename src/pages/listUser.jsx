/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 12/04/2025 - 15:35:23
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get('/admin/users/admin', {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setUsers(response.data || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleStatus = async (userId, currentStatus) => {
    const route = currentStatus
      ? `/admin/users/${userId}/deactivate`
      : `/admin/users/${userId}/activate`;
    const action = currentStatus ? 'bloquer' : 'activer';

    if (window.confirm(`Voulez-vous vraiment ${action} cet utilisateur ?`)) {
      try {
        await api.put(route);
        fetchUsers();
        alert(`Utilisateur ${action} avec succès.`);
      } catch (error) {
        console.error('Erreur lors du changement de statut :', error);
        alert("Une erreur s'est produite.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleShowModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  return (
    <div className="container-fluid">
      <div className="page-title-box">
        <h4 className="fw-semibold mb-2">Liste des utilisateurs</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Liste</a>
          </li>
          <li className="breadcrumb-item active">Utilisateurs</li>
        </ol>
      </div>

      <Form className="mb-3">
        {/* <Form.Control
          type="text"
          placeholder="Rechercher par nom ou email"
          value={searchTerm}
          onChange={handleSearchChange}
        /> */}
      </Form>

      <div className="table-responsive">
        <Table striped bordered hover responsive className="text-center">
          <thead className="bg-light">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      onClick={() => handleShowModal(user)}
                      variant="info"
                      size="sm"
                      className="me-2"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => toggleStatus(user.id, user.is_active)}
                      variant={user.is_active ? 'danger' : 'success'}
                      size="sm"
                    >
                      {user.is_active ? 'Bloquer' : 'Activer'}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucun utilisateur trouvé</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Pagination className="justify-content-center">
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

      {currentUser && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modifier l'utilisateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.phone}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, phone: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Rôle</Form.Label>
                <Form.Select
                  value={currentUser.role}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, role: e.target.value })
                  }
                >
                  <option value="user">Utilisateur</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrateur</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                try {
                  await api.put(`/api/users/${currentUser.id}`, {
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone,
                    role: currentUser.role,
                  });
                  alert('Utilisateur mis à jour avec succès.');
                  handleCloseModal();
                  fetchUsers();
                } catch (error) {
                  console.error('Erreur lors de la mise à jour :', error);
                  alert("Une erreur s'est produite lors de la mise à jour.");
                }
              }}
            >
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ListUser;
