import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLoginPage from './Auth/adminLogin';
import SupplierForm from './components/supplierForm';
import Sidebar from './pages/SideBar';
import SupplierTable from './Table/SupplierTable';
import SupplierView from './view/SupplierView';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
