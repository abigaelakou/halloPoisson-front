/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 21/03/2025 - 10:24:52
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 21/03/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const FishList = () => {
  const [fishes, setFishes] = useState([]);
  const [fishTypes, setFishTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer la liste des poissons
        const fishesResponse = await axios.get('/api/fishes'); // L'API DE liste des poissons
        setFishes(fishesResponse.data.data || []);

        // Récupérer la liste des types de poissons
        const fishTypesResponse = await axios.get('/api/fish-types'); // L'API DES TYPE DE POISSON
        setFishTypes(fishTypesResponse.data.data);
      } catch (error) {
        console.error('Erreur :', error);
        setFishes([]);
      }
    };

    fetchData();
  }, []);

  // Fonction pour obtenir le nom du type de poisson à partir de son ID
  const getFishTypeName = (fishTypeId) => {
    const fishType = fishTypes.find((type) => type.id === fishTypeId);
    return fishType ? fishType.name : 'Inconnu';
  };

  // Mise à jour du statut du poisson
  const togglePublication = async (fishId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await axios.patch(`/api/fishes/${fishId}/status`, { statut: newStatus });
      setFishes((prevFishes) =>
        prevFishes.map((fish) =>
          fish.id === fishId ? { ...fish, statut: newStatus } : fish
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  return (
    <>
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Tableau </h4>{' '}
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Liste </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Poisson </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div>
        <h2 className="text-center">
          <u> Liste des Poissons </u>{' '}
        </h2>{' '}
        <Table
          striped
          bordered
          hover
          className="text-center mt-4 table-responsive-sm"
        >
          <thead className="bg-light bg-opacity-50 thead-sm">
            <tr>
              <th scope="col"> Taille </th> <th scope="col"> Description </th>{' '}
              <th scope="col"> Image </th> <th scope="col"> Stock </th>{' '}
              <th scope="col"> Type de Poisson </th>{' '}
              <th scope="col"> Actions </th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {' '}
            {Array.isArray(fishes) && fishes.length > 0 ? (
              fishes.map((fish) => (
                <tr key={fish.id}>
                  <td> {fish.size} </td> <td> {fish.description} </td>{' '}
                  <td>
                    <img
                      src={fish.image_url}
                      alt={fish.description}
                      width="50"
                    />
                  </td>{' '}
                  <td> {fish.stock} </td>{' '}
                  <td> {getFishTypeName(fish.fish_type_id)} </td>{' '}
                  <td>
                    <button
                      onClick={() => togglePublication(fish.id, fish.statut)}
                      className={`btn btn-${fish.statut === 1 ? 'danger' : 'success'}`}
                    >
                      {fish.statut === 1 ? 'Retirer' : 'Publier'}{' '}
                    </button>{' '}
                  </td>{' '}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6"> Aucun poisson disponible </td>{' '}
              </tr>
            )}{' '}
          </tbody>{' '}
        </Table>{' '}
      </div>{' '}
    </>
  );
};

export default FishList;
