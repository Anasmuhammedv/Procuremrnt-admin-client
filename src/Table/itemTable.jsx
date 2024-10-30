import React, { useEffect, useState } from 'react';
import { getAllItem } from '../services/api';
import { MdCreateNewFolder } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response =await  getAllItem();
    
      setItems(response);
    };
    fetchItems();
  }, []);

  const navigate = useNavigate()

  return (
    <div className="mt-8 w-4/5 ml-auto mr-4">
      <h2 className="text-lg font-semibold mb-4">Item List</h2>
      <button onClick={() => navigate("/itemNew")} className="mb-4 mt-4 bg-slate-800 text-white p-2 rounded  ">
        <MdCreateNewFolder/>
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Item No</th>
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">Brand</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Unit Price</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 p-2">{item.itemNo}</td>
                <td className="border border-gray-300 p-2">{item.itemName}</td>
                <td className="border border-gray-300 p-2">{item.brand}</td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2">${item.unitPrice}</td>
                <td className="border border-gray-300 p-2">{item.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
