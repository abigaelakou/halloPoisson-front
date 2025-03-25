/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 21/03/2025 - 18:33:31
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

const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Récupérer la liste des poissons
        const usersResponse = await axios.get('/api/users'); // L'API DE liste des poissons
        setUsers(usersResponse.data.data || []);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des utilisateurs :',
          error
        );
      }
    };

    fetchUsers();
  }, []);

  // Mise à jour du statut du utilisateur
  const toggleStatut = async (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await axios.patch(`/api/users/${userId}/status`, { statut: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, statut: newStatus } : user
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
          <li className="breadcrumb-item active"> Gestionnaire </li>{' '}
        </ol>{' '}
      </div>{' '}
      <div className="container">
        <h2 className="text-center">
          {' '}
          <u> Liste des utilisateurs </u>{' '}
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
              <th scope="col"> Numéro de téléphone </th>{' '}
              <th scope="col"> Rôle </th> <th scope="col"> Actions </th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {' '}
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td> {user.name} </td> <td> {user.email} </td>{' '}
                  <td> {user.phone_number} </td> <td> {user.role} </td>{' '}
                  <td>
                    <button
                      onClick={() => toggleStatut(user.id, user.statut)}
                      className={`btn btn-${user.statut === 1 ? 'danger' : 'success'}`}
                    >
                      {user.statut === 1 ? 'Activer' : 'Bloquer'}{' '}
                    </button>{' '}
                  </td>{' '}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6"> Aucun utilisateur trouvé </td>{' '}
              </tr>
            )}{' '}
          </tbody>{' '}
        </Table>{' '}
      </div>{' '}
    </>
  );
};

export default ListUser;
