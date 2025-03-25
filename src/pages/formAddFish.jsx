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
import axios from 'axios';

const FormAddFish = () => {
  const initialFormState = {
    size: '',
    description: '',
    image: null,
    stock: '',
    fish_type_id: '',
  };

  const [fishData, setFishData] = useState(initialFormState);
  const [fishTypes, setFishTypes] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les types de poissons depuis l'API
    const fetchFishTypes = async () => {
      try {
        const response = await axios.get('/api/fish-types'); // L'API qui gère le type de poisson
        setFishTypes(response.data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des types de poissons :',
          error
        );
      }
    };

    fetchFishTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFishData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('size', fishData.size);
    formData.append('description', fishData.description);
    formData.append('image', fishData.image);
    formData.append('stock', fishData.stock);
    formData.append('fish_type_id', fishData.fish_type_id);

    try {
      await axios.post('/api/fish', formData); //  l'URL de l' API pour ajouter un poisson
      // Réinitialisation du formulaire après soumission
      setFishData(initialFormState);
    } catch (error) {
      console.error("Erreur lors de l'ajout du poisson :", error);
    }
  };

  return (
    <>
      {' '}
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Formulaire </h4>{' '}
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Ajout </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Poisson </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div className="row col-lg-8 offset-2 ">
        <div className="card">
          <div className="card-body">
            <h4 className="text-center">
              {' '}
              <u> Formulaire d'ajout de poisson</u>{' '}
            </h4>{' '}
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formTaille">
                  <Form.Label> Taille </Form.Label>{' '}
                  <Form.Control
                    type="text"
                    name="size"
                    value={fishData.size}
                    onChange={handleChange}
                    placeholder="10kg"
                    required
                  />
                </Form.Group>{' '}
                <Form.Group as={Col} controlId="formStock">
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
              </Row>{' '}
              <Row>
                <Form.Group
                  as={Col}
                  controlId="formFile"
                  className="image_url mb-3"
                >
                  <Form.Label> Image du poisson </Form.Label>{' '}
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>{' '}
                <Form.Group as={Col} controlId="formTypeFish">
                  <Form.Label> Type de Poisson </Form.Label>{' '}
                  <Form.Select
                    name="fish_type_id"
                    value={fishData.fish_type_id}
                    onChange={handleChange}
                    required
                  >
                    <option value=""> Choisir... </option>{' '}
                    {Array.isArray(fishTypes) &&
                      fishTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {' '}
                          {type.name}{' '}
                        </option>
                      ))}{' '}
                  </Form.Select>{' '}
                </Form.Group>{' '}
              </Row>{' '}
              <Row>
                <Form.Group as={Col} controlId="formDescription">
                  <Form.Label> Description </Form.Label>{' '}
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={fishData.description}
                    onChange={handleChange}
                    rows={2}
                    required
                  />
                </Form.Group>{' '}
              </Row>{' '}
              <Button variant="danger" className="center mt-2" type="submit">
                Enregistrer{' '}
              </Button>{' '}
            </Form>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </>
  );
};

export default FormAddFish;
