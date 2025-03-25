/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 24/03/2025 - 12:39:29
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 24/03/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const ListCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        //  l'URL de l'api des clients
        const response = await axios.get('/api/customers');
        setCustomers(response.data.data || []);
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    getCustomers();
  }, []);

  return (
    <>
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Tableau </h4>{' '}
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Liste </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Clients </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div>
        <h2 className="text-center">
          <u> Liste des Clients </u>{' '}
        </h2>{' '}
        <Table
          striped
          bordered
          hover
          className="text-center mt-4 table-responsive-sm"
        >
          <thead className="bg-light bg-opacity-50 thead-sm">
            <tr>
              <th scope="col"> Nom </th> <th scope="col"> Email </th>{' '}
              <th scope="col"> Numéro de Téléphone </th>{' '}
              <th scope="col"> Points de Fidélité </th>{' '}
              <th scope="col"> Actions </th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {' '}
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td> {customer.name} </td> <td> {customer.email} </td>{' '}
                  <td> {customer.phone_number} </td>{' '}
                  <td> {customer.loyalty_points} </td> <td> </td>{' '}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6"> Aucun client disponible </td>{' '}
              </tr>
            )}{' '}
          </tbody>{' '}
        </Table>{' '}
      </div>{' '}
    </>
  );
};

export default ListCustomer;
