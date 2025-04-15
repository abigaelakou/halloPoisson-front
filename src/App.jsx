/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 25/02/2025 - 14:33:59
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 25/02/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import { Routes, Route } from 'react-router-dom';
import FormAddFish from './pages/formAddFish';
import FishList from './pages/listFish';
import FormAddVariant from './pages/formAddVariant';
import VariantList from './pages/listVariant';
import FormAddUser from './pages/formAddUser';
import ListUser from './pages/listUser';
import ListCustomer from './pages/listCustomer';
import ListOrders from './pages/listOrder';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Connexion from './pages/connexion';

function App() {
  return (
    <>
      <Routes>
        {' '}
        <Route path="/connexion" element={<Connexion />} />{' '}
        {/*  les routes protégées */}{' '}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="page-content">
                  <Routes>
                    <Route path="/formAddFish" element={<FormAddFish />} />{' '}
                    <Route path="/listFish" element={<FishList />} />{' '}
                    <Route
                      path="/formAddVariant"
                      element={<FormAddVariant />}
                    />{' '}
                    <Route path="/listVariant" element={<VariantList />} />{' '}
                    <Route path="/formAddUser" element={<FormAddUser />} />{' '}
                    <Route path="/listUser" element={<ListUser />} />{' '}
                    <Route path="/listCustomer" element={<ListCustomer />} />{' '}
                    <Route path="/listOrder" element={<ListOrders />} />{' '}
                    <Route path="/Dashboard" element={<Dashboard />} />{' '}
                  </Routes>{' '}
                  <Footer />
                </div>{' '}
              </div>{' '}
            </ProtectedRoute>
          }
        />{' '}
      </Routes>{' '}
    </>
  );
}

export default App;
