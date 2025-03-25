/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 24/03/2025 - 13:14:30
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

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getOrdersAndCustomers = async () => {
      try {
        // l'URL de votre API pour récupérer la liste des commandes
        const ordersResponse = await axios.get('/api/orders');
        setOrders(ordersResponse.data.data || []);

        // l'URL de votre API pour récupérer la liste des clients
        const customersResponse = await axios.get('/api/customers');
        setCustomers(customersResponse.data.data || []);
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    getOrdersAndCustomers();
  }, []);

  // Fonction pour obtenir le nom du client à partir de son ID
  const getCustomerName = (userId) => {
    const customer = customers.find((c) => c.id === userId);
    return customer ? customer.name : 'Inconnu';
  };

  return (
    <>
      <div className="page-title-box">
        <h4 className="mb-0 fw-semibold"> Tableau </h4>{' '}
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#"> Liste </a>{' '}
          </li>{' '}
          <li className="breadcrumb-item active"> Commandes </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div>
        <h2 className="text-center">
          <u> Liste des Commandes </u>{' '}
        </h2>{' '}
        <Table striped bordered hover className="text-center mt-4">
          <thead className="bg-light bg-opacity-50 thead-sm">
            <tr>
              <th scope="col"> Nom du Client </th>{' '}
              <th scope="col"> Adresse </th>{' '}
              <th scope="col"> Numéro de Commande </th>{' '}
              <th scope="col"> Type de Paiement </th>{' '}
              <th scope="col"> Date de Livraison Estimée </th>{' '}
              <th scope="col"> Date de Livraison </th>{' '}
              <th scope="col"> Statut </th> <th scope="col"> Action </th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {' '}
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td> {getCustomerName(order.user_id)} </td>{' '}
                  <td> {order.address_id} </td> <td> {order.order_no} </td>{' '}
                  <td> {order.payment_type} </td>{' '}
                  <td> {order.estimated_delivery_date} </td>{' '}
                  <td> {order.delivery_date} </td> <td> {order.status} </td>
                  <td> </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8"> Aucune commande disponible </td>{' '}
              </tr>
            )}{' '}
          </tbody>{' '}
        </Table>{' '}
      </div>{' '}
    </>
  );
};

export default ListOrders;
