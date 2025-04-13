/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 21/03/2025 - 10:17:57
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 21/03/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import api from '../services/api';

const FormAddVariant = () => {
  const initialFormState = {
    size: '',
    type: '',
    stock: '',
    min_weight: '',
    max_weight: '',
    fish_id: '',
  };

  const [fishData, setFishData] = useState(initialFormState);
  const [fishes, setFishes] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFishes = async () => {
      try {
        const response = await api.get('/admin/fishes');
        setFishes(response.data || []); // Stocker les poissons
      } catch (error) {
        console.error('Erreur lors de la récupération des poissons :', error);
        setErrorMessage('Impossible de charger les poissons.');
      }
    };

    fetchFishes();
  }, []);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const formData = new FormData();
    Object.keys(fishData).forEach((key) => {
      formData.append(key, fishData[key]);
    });

    try {
      await api.post('/admin/fishes/variants', formData);
      setSuccessMessage('Variant ajouté avec succès !');
      setFishData(initialFormState);
    } catch (error) {
      console.error("Erreur lors de l'ajout du variant :", error);
      if (error.response?.data?.errors) {
        console.table(error.response.data.errors);
      }
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <Container className="my-4">
      <div className="page-title-box text-center mb-4">
        <h4 className="fw-semibold"> Formulaire </h4>{' '}
        <ol className="breadcrumb justify-content-center">
          <li className="breadcrumb-item">
            <a href="#"> Ajout </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Variant </li>{' '}
        </ol>{' '}
      </div>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={6}>
          <Card>
            <Card.Body>
              <h5 className="text-center mb-4">
                <u> Formulaire d 'ajout de variant</u>{' '}
              </h5>
              {successMessage && (
                <Alert variant="success"> {successMessage} </Alert>
              )}
              {errorMessage && <Alert variant="danger"> {errorMessage} </Alert>}
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Label>Taille</Form.Label>
                  <Form.Select
                    name="size"
                    value={fishData.size}
                    onChange={handleChange}
                  >
                    <option value="">Choisir...</option>
                    <option value="Small">Petit</option>
                    <option value="Medium">Moyen</option>
                    <option value="Large">Grand</option>
                  </Form.Select>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={fishData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choisir...</option>
                      <option value="Alive">Fumé</option>
                      <option value="Fresh">Frais</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="formMin_weight">
                    <Form.Label> Poids minimal </Form.Label>{' '}
                    <Form.Control
                      type="number"
                      name="min_weight"
                      value={fishData.min_weight}
                      onChange={handleChange}
                      placeholder="50"
                      required
                    />
                  </Form.Group>{' '}
                  <Form.Group as={Col} md="6" controlId="formMax_weight">
                    <Form.Label> Poids maximal </Form.Label>{' '}
                    <Form.Control
                      type="number"
                      name="max_weight"
                      value={fishData.max_weight}
                      onChange={handleChange}
                      placeholder="70"
                      required
                    />
                  </Form.Group>{' '}
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formStock">
                    <Form.Label> Stock </Form.Label>{' '}
                    <Form.Control
                      type="number"
                      name="stock"
                      value={fishData.stock}
                      onChange={handleChange}
                      placeholder="50"
                      required
                    />
                  </Form.Group>{' '}
                  <Form.Group as={Col} md="6" controlId="formTypeFish">
                    <Form.Label> Le Poisson </Form.Label>{' '}
                    <Form.Select
                      name="fish_id"
                      value={fishData.fish_id}
                      onChange={handleChange}
                      required
                    >
                      <option value=""> Choisir... </option>{' '}
                      {fishes.map((fish) => (
                        <option key={fish.id} value={fish.id}>
                          {fish.name}{' '}
                        </option>
                      ))}
                    </Form.Select>{' '}
                  </Form.Group>{' '}
                </Row>
                <div className="text-center">
                  <Button variant="danger" type="submit">
                    Enregistrer{' '}
                  </Button>{' '}
                </div>{' '}
              </Form>{' '}
            </Card.Body>{' '}
          </Card>{' '}
        </Col>{' '}
      </Row>{' '}
    </Container>
  );
};

export default FormAddVariant;
