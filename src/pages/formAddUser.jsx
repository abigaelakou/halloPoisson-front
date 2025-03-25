/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 21/03/2025 - 18:08:12
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 21/03/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const UserCreationForm = () => {
  const initialFormState = {
    name: '',
    email: '',
    phone_number: '',
    password: '',
    role: '',
  };

  const [userData, setUserData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', userData);
      console.log('Réponse du serveur :', response.data);
      setUserData(initialFormState);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  return (
    <>
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Formulaire </h4>{' '}
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Ajout </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Utilisateur </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div className="row col-lg-8 offset-2">
        <div className="card">
          <div className="card-body">
            <h4 className="text-center">
              {' '}
              <u> Formulaire de création d'un gestionnaire</u>
            </h4>{' '}
            <Form onSubmit={handleSubmit} className="mt-2">
              <Row className="mb-3">
                <Form.Group as={Col} className="mb-3" controlId="userName">
                  <Form.Label> Nom </Form.Label>{' '}
                  <Form.Control
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Entrez le nom"
                    required
                  />
                </Form.Group>{' '}
                <Form.Group as={Col} className="mb-3" controlId="userEmail">
                  <Form.Label> Email </Form.Label>{' '}
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Entrez l'email"
                    required
                  />
                </Form.Group>{' '}
              </Row>{' '}
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="userPhoneNumber"
                >
                  <Form.Label> Téléphone </Form.Label>{' '}
                  <Form.Control
                    type="text"
                    name="phone_number"
                    value={userData.phone_number}
                    onChange={handleChange}
                    placeholder="Entrez le numéro de téléphone"
                    required
                  />
                </Form.Group>{' '}
                <Form.Group as={Col} className="mb-3" controlId="userPassword">
                  <Form.Label> Mot de passe </Form.Label>{' '}
                  <Form.Control
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Entrez le mot de passe"
                    required
                  />
                </Form.Group>{' '}
              </Row>{' '}
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label> Rôle </Form.Label>{' '}
                <Form.Select
                  as="select"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  required
                >
                  <option value=""> Sélectionnez un rôle </option>{' '}
                  <option value="user"> Utilisateur </option>{' '}
                  <option value="admin"> Administrateur </option>{' '}
                </Form.Select>{' '}
              </Form.Group>{' '}
              <Button
                type="submit"
                className="text-center"
                variant="danger"
                size="sm"
              >
                Enregistrer{' '}
              </Button>{' '}
            </Form>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </>
  );
};

export default UserCreationForm;
