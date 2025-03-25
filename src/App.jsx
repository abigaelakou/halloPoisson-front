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
import FormFishType from './pages/formFishType';
import FormAddFish from './pages/formAddFish';
import FishList from './pages/listFish';
import TypeFishList from './pages/listTypeFish';
import FormAddUser from './pages/formAddUser';
import ListUser from './pages/listUser';
import ListCustomer from './pages/listCustomer';
import ListOrders from './pages/listOrder';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/formFishType" element={<FormFishType />} />{' '}
            <Route path="/formAddFish" element={<FormAddFish />} />{' '}
            <Route path="/listTypeFish" element={<TypeFishList />} />{' '}
            <Route path="/listFish" element={<FishList />} />{' '}
            <Route path="/formAddUser" element={<FormAddUser />} />{' '}
            <Route path="/listUser" element={<ListUser />} />{' '}
            <Route path="/listCustomer" element={<ListCustomer />} />{' '}
            <Route path="/listOrder" element={<ListOrders />} />{' '}
            <Route path="/" element={<Dashboard />} />{' '}
          </Routes>{' '}
          <Footer />
        </div>{' '}
      </div>{' '}
    </>
  );
}

export default App;
