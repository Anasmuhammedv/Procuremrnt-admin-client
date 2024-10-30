import React, { useState, useEffect } from 'react';
import { createItem, getAllSupplier } from '../services/api';

const CreateItem = () => {
  const [itemData, setItemData] = useState({
    itemName: '',
    inventoryLocation: '',
    brand: '',
    category: '',
    supplier: '',
    stockUnit: '',
    unitPrice: '',
    status: 'Enabled',
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getAllSupplier();
      console.log(response, "this is from item page");
      setSuppliers(response);
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createItem(itemData);
      alert('Item added successfully!');
      setItemData({
        itemName: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplier: '',
        stockUnit: '',
        unitPrice: '',
        status: 'Enabled',
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Item</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Item Name</label>
          <input
            type="text"
            name="itemName"
            placeholder="Enter item name"
            value={itemData.itemName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Inventory Location</label>
          <input
            type="text"
            name="inventoryLocation"
            placeholder="Enter inventory location"
            value={itemData.inventoryLocation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Enter brand name"
            value={itemData.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={itemData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Supplier</label>
          <select
            name="supplier"
            value={itemData.supplier}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Stock Unit</label>
          <select
            name="stockUnit"
            value={itemData.stockUnit}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Stock Unit</option>
            <option value="pcs">Pcs</option>
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Unit Price</label>
          <input
            type="number"
            name="unitPrice"
            placeholder="Enter unit price"
            value={itemData.unitPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            name="status"
            value={itemData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
          Add Item
        </button>
      </div>
    </form>
  );
};

export default CreateItem;
