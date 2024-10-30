
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSupplier } from '../services/api'; 

const SupplierForm = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    address: '',
    taxNo: '',
    country: '',
    mobileNo: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await createSupplier(supplier);
      alert('Supplier created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating supplier:', error);
      alert('Failed to create supplier');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Supplier</h2>
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {Object.entries(supplier).map(([key, value]) => (
            <div className="space-y-2" key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;
