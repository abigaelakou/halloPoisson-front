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
import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import api from '../services/api'; // Assure-toi que ce chemin est correct

const UserCreationForm = () => {
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  };

  const [userData, setUserData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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
      const response = await api.post('/auth/register', userData);
      console.log('Réponse du serveur :', response.data);
      setUserData(initialFormState);
      setErrors({});
      setSuccessMessage('Utilisateur créé avec succès !');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setSuccessMessage('');
      if (error.response?.status === 422 && error.response.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur lors de la création de l'utilisateur :", error);
      }
    }
  };

  return (
    <>
      <div className="page-title-box mb-3">
        <h4 className="fw-semibold mb-2">Formulaire</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Ajout</a>
          </li>
          <li className="breadcrumb-item active">Utilisateur</li>
        </ol>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-center mb-4">
                <u>Formulaire de création d'un gestionnaire</u>
              </h4>

              {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                  {successMessage}
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="userName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      placeholder="Entrez le nom"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="userEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Entrez l'email"
                      required
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email[0]}</div>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="userPhoneNumber">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      placeholder="Entrez le numéro de téléphone"
                      required
                    />
                    {errors.phone && (
                      <div className="text-danger">{errors.phone[0]}</div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="userPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Entrez le mot de passe"
                      required
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Rôle</Form.Label>
                  <Form.Select
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un rôle</option>
                    <option value="user">Utilisateur</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Administrateur</option>
                  </Form.Select>
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="danger" size="md">
                    Enregistrer
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreationForm;
