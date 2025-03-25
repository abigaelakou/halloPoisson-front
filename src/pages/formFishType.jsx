/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 25/02/2025 - 10:11:28
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 25/02/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const FishTypeForm = () => {
  // pour réinitialiser
  const initialFormState = {
    name: '',
    price: '',
  };
  // Initialisation de l'état avec l'état initial
  const [fishTypeData, setFishTypeData] = useState(initialFormState);

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishTypeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/fish-types', fishTypeData);
      console.log('Réponse du serveur :', response.data);
      setFishTypeData(initialFormState);
    } catch (error) {
      console.error("Erreur lors de l'ajout du type de poisson :", error);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row">
        <div className="page-title-box">
          <h4 className="mb-0 fw-semibold"> Formulaire </h4>{' '}
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#"> Ajout </a>{' '}
            </li>{' '}
            <li className="breadcrumb-item active"> Type de Poisson </li>{' '}
          </ol>{' '}
        </div>{' '}
        <div className="row col-lg-6 offset-3">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">
                {' '}
                <u> Formulaire d'ajout de type de poisson</u>{' '}
              </h4>{' '}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fishName">
                  <Form.Label> Nom du Poisson </Form.Label>{' '}
                  <Form.Control
                    type="text"
                    name="name"
                    value={fishTypeData.name}
                    onChange={handleChange}
                    placeholder="Tilapia"
                    required
                  />
                </Form.Group>{' '}
                <Form.Group className="mb-3" controlId="fishPrice">
                  <Form.Label> Prix du Poisson </Form.Label>{' '}
                  <Form.Control
                    type="number"
                    name="price"
                    value={fishTypeData.price}
                    onChange={handleChange}
                    placeholder="Entrez le prix"
                    required
                  />
                </Form.Group>{' '}
                <Button type="submit" variant="danger" size="sm">
                  Soumettre{' '}
                </Button>{' '}
              </Form>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
};

export default FishTypeForm;
