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
import api from '../services/api';

const FishForm = () => {
  const initialFormState = {
    name: '',
    price: '',
    img: '',
  };

  const [fishData, setFishData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      setFishData((prevData) => ({
        ...prevData,
        img: files[0],
      }));
    } else {
      setFishData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', fishData.name);
    formData.append('price', fishData.price);
    formData.append('img', fishData.img);

    try {
      const response = await api.post('/admin/fishes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Réponse du serveur :', response.data);
      setMessage('Poisson ajouté avec succès !');
      setErrors({});
      setFishData(initialFormState);
    } catch (error) {
      // console.error("Erreur lors de l'ajout du poisson :", error);
      console.error(
        "Erreur lors de l'ajout du poisson :",
        error.response?.data
      );

      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setMessage("Une erreur s'est produite.");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-center mb-4">
                <u>Formulaire d&apos;ajout de poisson</u>
              </h4>

              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fishName">
                  <Form.Label>Nom du Poisson</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={fishData.name}
                    onChange={handleChange}
                    placeholder="Tilapia"
                    required
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name && errors.name[0]}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="fishPrice">
                  <Form.Label>Prix du Poisson</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={fishData.price}
                    onChange={handleChange}
                    placeholder="Entrez le prix"
                    required
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price && errors.price[0]}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image du poisson</Form.Label>
                  <Form.Control
                    type="file"
                    name="img"
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="danger" size="sm">
                    Soumettre
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishForm;
