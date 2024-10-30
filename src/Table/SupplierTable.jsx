// components/SupplierTable.jsx
import { useEffect, useState } from "react";
import { getAllSupplier, deleteSupplier } from "../services/api";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";

const SupplierTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const fetchSuppliers = async () => {
    try {
      const response = await getAllSupplier();
      setSuppliers(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setSuppliers(suppliers.filter(supplier => supplier._id !== id));
      alert('Supplier deleted successfully');
    } catch (error) {
      console.error('Error deleting supplier:', error);
      alert('Failed to delete supplier');
    }
  };

  const handleEdit = (id) => {
    navigate(`/supplier/${id}`); 
  };

  if (isLoading) return <p>Loading suppliers...</p>;
  if (error) return <p>Error loading suppliers: {error.message}</p>;

  return (
    <div className="container mx-auto my-4 p-4 w-3/5">
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      <button onClick={() => navigate("/supplier/create")} className="mt-4 bg-black text-white p-2 rounded ">
        <MdCreateNewFolder/>
      </button>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Actions</th>
            {/* <th className="border p-2">Actions</th> Added Actions header */}
          </tr>
        </thead>
        <tbody>
          {suppliers.map(({ _id, name, email, mobileNo, status, country }) => (
            <tr key={_id} className="hover:bg-gray-100">
              <td className="border p-2">{name}</td>
              <td className="border p-2">{email}</td>
              <td className="border p-2">{mobileNo}</td>
              <td className="border p-2">{status}</td>
              <td className="border p-2">{country}</td>
              <td className="border p-2"> {/* Added Actions column */}
                <button onClick={() => handleEdit(_id)} className="text-blue-500 mr-2">
                  <MdOutlineEdit/>
                </button>
                <button onClick={() => handleDelete(_id)} className="text-red-500">
                  <MdDelete/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default SupplierTable;
