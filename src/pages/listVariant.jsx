/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 13/04/2025 - 10:44:39
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 13/04/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import {
  Table,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  Spinner,
  Alert,
} from 'react-bootstrap';
import api from '../services/api';

const VariantList = () => {
  const [variants, setVariants] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [actionType, setActionType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, show: true });
    setTimeout(() => {
      setAlert({ message: '', type: '', show: false });
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const variantResponse = await api.get('/admin/fishes/variants');
        const fishResponse = await api.get('/admin/fishes');
        setVariants(variantResponse.data || []);
        setFishes(fishResponse.data);
      } catch (error) {
        console.error('Erreur :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFishTypeName = (fishTypeId) => {
    const type = fishes.find((fish) => fish.id === fishTypeId);
    return type ? type.name : 'Inconnu';
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredVariants = variants.filter((variant) => {
    const size = variant.size || '';
    const fishName = getFishTypeName(variant.fish_id) || '';
    return (
      size.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fishName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentVariants = filteredVariants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const confirmToggle = (variant, type) => {
    setSelectedVariant(variant);
    setActionType(type);
    setShowModal(true);
  };

  const handlePublish = async (id) => {
    try {
      const updatedVariant = { is_active: 1 };
      await api.put(`/admin/fishes/variants/${id}`, updatedVariant);
      setVariants((prev) =>
        prev.map((variant) =>
          variant.id === id ? { ...variant, is_active: 1 } : variant
        )
      );
      showAlert('Variant publié avec succès', 'success');
    } catch (error) {
      console.error('Erreur publication :', error);
      showAlert('Erreur lors de la publication', 'danger');
    }
  };

  const handleUnpublish = async (id) => {
    try {
      const updatedVariant = { is_active: 0 };
      await api.put(`/admin/fishes/variants/${id}`, updatedVariant);
      setVariants((prev) =>
        prev.map((variant) =>
          variant.id === id ? { ...variant, is_active: 0 } : variant
        )
      );
      showAlert('Variant retiré avec succès', 'success');
    } catch (error) {
      console.error('Erreur retrait :', error);
      showAlert('Erreur lors du retrait', 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette variant ?'))
      return;
    try {
      await api.delete(`/admin/fishes/variants/${id}`);
      setVariants((prev) => prev.filter((variant) => variant.id !== id));
      showAlert('Poisson supprimé avec succès', 'success');
    } catch (error) {
      console.error('Erreur suppression :', error);
      showAlert('Erreur lors de la suppression', 'danger');
    }
  };

  const handleUpdateVariant = async () => {
    try {
      if (!selectedVariant || !selectedVariant.id) return;
      await api.put(
        `/admin/fishes/variants/${selectedVariant.id}`,
        selectedVariant
      );
      setVariants((prev) =>
        prev.map((v) => (v.id === selectedVariant.id ? selectedVariant : v))
      );
      setShowModal(false);
      setSelectedVariant(null);
      setActionType('');
      showAlert('Variant modifié avec succès', 'success');
    } catch (error) {
      console.error('Erreur mise à jour variant :', error);
      showAlert('Erreur lors de la mise à jour', 'danger');
    }
  };

  const togglePublication = () => {
    if (!selectedVariant) return;
    if (selectedVariant.is_active === 0) {
      handlePublish(selectedVariant.id);
    } else {
      handleUnpublish(selectedVariant.id);
    }
    setShowModal(false);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6}>
          <h4>Liste des Variants</h4>
        </Col>
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Recherche par taille ou poisson..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      {/* ✅ Affichage de l'alerte */}
      {alert.show && (
        <Row className="mb-3">
          <Col>
            <Alert
              variant={alert.type}
              dismissible
              onClose={() => setAlert({ ...alert, show: false })}
            >
              {alert.message}
            </Alert>
          </Col>
        </Row>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive size="sm">
            <thead className="bg-light">
              <tr>
                <th>Taille</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Poids min</th>
                <th>Poids max</th>
                <th>Poisson</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentVariants.length > 0 ? (
                currentVariants.map((variant) => (
                  <tr key={variant.id}>
                    <td>{variant.size}</td>
                    <td>{variant.stock}</td>
                    <td>{variant.type}</td>
                    <td>{variant.min_weight}</td>
                    <td>{variant.max_weight}</td>
                    <td>{getFishTypeName(variant.fish_id)}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => confirmToggle(variant, 'modifier')}
                        >
                          Modifier
                        </Button>
                        {variant.is_active === 0 ? (
                          <Button
                            variant="success"
                            size="sm"
                            className="ms-2"
                            onClick={() => handlePublish(variant.id)}
                          >
                            Publier
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleUnpublish(variant.id)}
                          >
                            Retirer
                          </Button>
                        )}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(variant.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Aucun variant trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {Array.from({
              length: Math.ceil(filteredVariants.length / itemsPerPage),
            }).map((_, i) => (
              <Button
                key={i}
                variant={i + 1 === currentPage ? 'primary' : 'outline-primary'}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Modal pour Modifier / Publier / Retirer */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === 'modifier'
              ? 'Modifier le Variant'
              : actionType === 'publier'
                ? 'Confirmer la publication'
                : 'Confirmer le retrait'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actionType === 'modifier' ? (
            <Form>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="formSize">
                    <Form.Label>Taille</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedVariant?.size || ''}
                      onChange={(e) =>
                        setSelectedVariant({
                          ...selectedVariant,
                          size: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedVariant?.stock || ''}
                      onChange={(e) =>
                        setSelectedVariant({
                          ...selectedVariant,
                          stock: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group controlId="formFishType">
                    <Form.Label>Poisson</Form.Label>
                    <Form.Select
                      value={selectedVariant?.fish_id || ''}
                      onChange={(e) =>
                        setSelectedVariant({
                          ...selectedVariant,
                          fish_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="">Choisir un poisson</option>
                      {fishes.map((fish) => (
                        <option key={fish.id} value={fish.id}>
                          {fish.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          ) : (
            <p>
              Êtes-vous sûr de vouloir{' '}
              {actionType === 'publier' ? 'publier' : 'retirer'} ce variant ?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button
            variant={
              actionType === 'modifier'
                ? 'primary'
                : actionType === 'publier'
                  ? 'success'
                  : 'danger'
            }
            onClick={() => {
              if (actionType === 'modifier') handleUpdateVariant();
              else togglePublication();
            }}
          >
            {actionType === 'modifier'
              ? 'Enregistrer'
              : actionType === 'publier'
                ? 'Publier'
                : 'Retirer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VariantList;
