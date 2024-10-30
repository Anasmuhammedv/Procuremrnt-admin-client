import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getASupplier, updateASupplier } from "../services/api";

const SupplierView = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    taxNo: '',
    country: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchSupplier = async () => {
        try {
          const response = await getASupplier(id);
          console.log(response);
          
          setSupplier(response);
        } catch (error) {
          console.error('Error fetching supplier:', error);
          alert('Failed to fetch supplier data');
        }
      };
      fetchSupplier();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateASupplier(id, supplier);
        alert('Supplier updated successfully');
        navigate('/supplierTable')
      }
    } catch (error) {
      console.error('Error saving supplier:', error);
      alert('Failed to save supplier');
    }
  };

  return (
    <div className="container mx-auto my-4 p-4 w-3/5">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Supplier' : 'Create Supplier'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            value={supplier.name}
            onChange={handleChange}
            placeholder="Supplier Name"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            value={supplier.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            name="phone"
            value={supplier.mobileNo}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            name="address"
            value={supplier.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            name="taxNo"
            value={supplier.taxNo}
            onChange={handleChange}
            placeholder="Tax Number"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            name="country"
            value={supplier.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full p-2 border rounded"
          />
        </div>
       
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {id ? 'Update Supplier' : 'Create Supplier'}
        </button>
      </form>
    </div>
  );
};

export default SupplierView;
