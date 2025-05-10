/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 12/04/2025 - 13:24:15
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import api from '../services/api';

const FishList = () => {
  const [fishes, setFishes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFish, setCurrentFish] = useState({
    id: null,
    name: '',
    price: '',
    img: '',
    is_active: 0,
  });
  const [alert, setAlert] = useState({ message: '', type: '', show: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, show: true });
    setTimeout(() => {
      setAlert({ message: '', type: '', show: false });
    }, 3000); // 3 secondes
  };

  const fetchFishes = async () => {
    try {
      const response = await api.get('/admin/fishes');
      console.log('Données récupérées:', response.data);
      setFishes(response.data || []);
    } catch (error) {
      console.error(
        'Erreur chargement :',
        error.response ? error.response.data : error.message
      );
      showAlert('Erreur lors du chargement des données', 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce poisson ?')) return;
    try {
      await api.delete(`/admin/fishes/${id}`);
      setFishes((prev) => prev.filter((fish) => fish.id !== id));
      showAlert('Poisson supprimé avec succès', 'success');
    } catch (error) {
      console.error('Erreur suppression :', error);
      showAlert('Erreur lors de la suppression', 'danger');
    }
  };

  const handleEdit = (fish) => {
    setCurrentFish(fish);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentFish({ id: null, name: '', price: '', img: '', is_active: 0 });
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentFish((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/admin/fishes/${currentFish.id}`, currentFish);
      setFishes((prev) =>
        prev.map((fish) => (fish.id === currentFish.id ? currentFish : fish))
      );
      showAlert('Poisson mis à jour avec succès', 'success');
      handleModalClose();
    } catch (error) {
      console.error('Erreur update :', error);
      showAlert('Erreur lors de la mise à jour', 'danger');
    }
  };

  // Fonction pour publier un poisson
  const handlePublish = async (id) => {
    try {
      const updatedFish = { is_active: 1 }; // On met à jour 'is_active' à 1
      await api.put(`/admin/fishes/${id}`, updatedFish);
      setFishes((prev) =>
        prev.map((fish) => (fish.id === id ? { ...fish, is_active: 1 } : fish))
      );
      showAlert('Poisson publié avec succès', 'success');
    } catch (error) {
      console.error('Erreur publication :', error);
      showAlert('Erreur lors de la publication', 'danger');
    }
  };

  // Fonction pour retirer un poisson
  const handleUnpublish = async (id) => {
    try {
      const updatedFish = { is_active: 0 }; // On met à jour 'is_active' à 0
      await api.put(`/admin/fishes/${id}`, updatedFish);
      setFishes((prev) =>
        prev.map((fish) => (fish.id === id ? { ...fish, is_active: 0 } : fish))
      );
      showAlert('Poisson retiré avec succès', 'success');
    } catch (error) {
      console.error('Erreur retrait :', error);
      showAlert('Erreur lors du retrait', 'danger');
    }
  };

  useEffect(() => {
    fetchFishes();
  }, []);

  // Recherche et pagination
  const filteredFishes = fishes.filter((fish) =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFishes = filteredFishes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFishes.length / itemsPerPage);

  return (
    <>
      {' '}
      {alert.show && (
        <Alert variant={alert.type} className="text-center">
          {' '}
          {alert.message}{' '}
        </Alert>
      )}{' '}
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Tableau </h4>{' '}
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Liste </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Poisson </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div className="container-fluid">
        <h2 className="text-center">
          <u> Liste des poissons </u>{' '}
        </h2>{' '}
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />{' '}
        </Form>{' '}
        <div className="table-responsive">
          <Table striped bordered hover className="text-center mt-4">
            <thead className="bg-light bg-opacity-50">
              <tr>
                <th> Nom </th> <th> Prix </th> <th> Image </th>{' '}
                <th> Actions </th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody>
              {' '}
              {currentFishes.length > 0 ? (
                currentFishes.map((fish) => (
                  <tr key={fish.id}>
                    <td> {fish.name} </td> <td> {fish.price} </td>{' '}
                    <td>
                      {' '}
                      {fish.img ? (
                        <img
                          src={`http://localhost:8000/storage/${fish.img}`}
                          alt={fish.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <span> Aucune image </span>
                      )}{' '}
                    </td>{' '}
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(fish)}
                      >
                        Modifier{' '}
                      </Button>{' '}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(fish.id)}
                      >
                        Supprimer{' '}
                      </Button>{' '}
                      {fish.is_active === 0 ? (
                        <Button
                          variant="success"
                          size="sm"
                          className="ms-2"
                          onClick={() => handlePublish(fish.id)}
                        >
                          Publier{' '}
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          className="ms-2"
                          onClick={() => handleUnpublish(fish.id)}
                        >
                          Retirer{' '}
                        </Button>
                      )}{' '}
                    </td>{' '}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4"> Aucun poisson disponible </td>{' '}
                </tr>
              )}{' '}
            </tbody>{' '}
          </Table>{' '}
        </div>{' '}
        {/* Pagination */}{' '}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="me-2"
            >
              Précédent{' '}
            </Button>{' '}
            <span className="align-self-center">
              Page {currentPage}/ {totalPages}{' '}
            </span>{' '}
            <Button
              variant="outline-primary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="ms-2"
            >
              Suivant{' '}
            </Button>{' '}
          </div>
        )}{' '}
      </div>{' '}
      {/* MODAL ÉDITION */}{' '}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title> Modifier un poisson </Modal.Title>{' '}
        </Modal.Header>{' '}
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label> Nom du Poisson </Form.Label>{' '}
              <Form.Control
                type="text"
                name="name"
                value={currentFish.name}
                onChange={handleModalChange}
              />{' '}
            </Form.Group>{' '}
            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label> Prix </Form.Label>{' '}
              <Form.Control
                type="number"
                name="price"
                value={currentFish.price}
                onChange={handleModalChange}
              />{' '}
            </Form.Group>{' '}
            <Form.Group controlId="formImg" className="mb-3">
              <Form.Label> Image </Form.Label>{' '}
              <Form.Control
                type="file"
                name="img"
                value={currentFish.img}
                onChange={handleModalChange}
              />{' '}
            </Form.Group>{' '}
          </Form>{' '}
        </Modal.Body>{' '}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annuler{' '}
          </Button>{' '}
          <Button variant="primary" onClick={handleUpdate}>
            Enregistrer{' '}
          </Button>{' '}
        </Modal.Footer>{' '}
      </Modal>{' '}
    </>
  );
};

export default FishList;
