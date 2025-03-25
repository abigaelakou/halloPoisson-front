/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 20/03/2025 - 11:11:42
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 20/03/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const TypeFishList = () => {
  const [typefishes, setTypeFishes] = useState([]);

  useEffect(() => {
    const getTypeFishes = async () => {
      try {
        // Récupérer la liste des types de poissons
        const fishesResponse = await axios.get('/api/fishes'); // L'API DE liste des types de poissons
        setTypeFishes(fishesResponse.data.data || []);
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    getTypeFishes();
  }, []);

  return (
    <>
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Tableau </h4>{' '}
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Liste </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Type de Poisson </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div>
        <h2 className="text-center">
          {' '}
          <u> Liste Type de Poissons </u>{' '}
        </h2>{' '}
        <Table
          striped
          bordered
          hover
          className="text-center mt-4 table-responsive-sm"
        >
          <thead className="bg-light bg-opacity-50 thead-sm">
            <tr>
              <th scope="col"> Nom </th> <th scope="col"> Prix </th>{' '}
              <th scope="col"> Actions </th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {' '}
            {Array.isArray(typefishes) && typefishes.length > 0 ? (
              typefishes.map((tfish) => (
                <tr key={tfish.id}>
                  <td> {tfish.name} </td> <td> {tfish.price} </td>{' '}
                  <td> </td>{' '}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6"> Aucun type de poisson disponible </td>{' '}
              </tr>
            )}{' '}
          </tbody>{' '}
        </Table>{' '}
      </div>{' '}
    </>
  );
};

export default TypeFishList;
