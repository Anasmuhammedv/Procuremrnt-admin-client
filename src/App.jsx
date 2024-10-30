import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLoginPage from './Auth/adminLogin';
import SupplierForm from './components/supplierForm';
import Sidebar from './pages/SideBar';
import SupplierTable from './Table/SupplierTable';
import SupplierView from './view/SupplierView';
import ItemList from './Table/itemTable';
import CreateItem from './components/createItem';
import CreatePurchaseOrder from './Table/purchaseOrderTable';
import DashBoard from './pages/adminDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          
          <Route path="/" element={<AdminLoginPage />} />
          
          <Route path="/supplierTable" element={
            <>
              <Sidebar />
              <div className="main-content">
                <SupplierTable />
              </div>
            </>
          } />
          <Route path="/supplier/create" element={
            <>
              <Sidebar />
              <div className="main-content">
                <SupplierForm />
              </div>
            </>
          } />
          <Route path="/supplier/:id" element={
            <>
              <Sidebar />
              <div className="main-content">
                <SupplierView />
              </div>
            </>
          } />
           <Route path="/itemTable" element={
            <>
              <Sidebar />
              <div className="main-content">
                <ItemList />
              </div>
            </>
          } />
          <Route path="/itemNew" element={
            <>
              <Sidebar />
              <div className="main-content">
                <CreateItem />
              </div>
            </>
          } />
           <Route path="/purchaseOrder" element={
            <>
              <Sidebar />
              <div className="main-content">
                <CreatePurchaseOrder />
              </div>
            </>
          } />
             <Route path="/Dashboard" element={
            <>
              <Sidebar />
              <div className="main-content">
                <DashBoard />
              </div>
            </>
          } />
        </Routes>
        
      </div>
    </Router>



  
  );
}

export default App;
