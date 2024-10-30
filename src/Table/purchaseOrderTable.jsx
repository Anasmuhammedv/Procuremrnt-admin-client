
import React, { useState, useEffect } from 'react';
import { createPurchaseOrder, getAllSupplier, getAllItem, exportPurchaseOrder } from '../services/api';

const CreatePurchaseOrder = () => {
  const [orderData, setOrderData] = useState({
    supplier: undefined,
    itemTotal: 0,
    discountTotal: 0,
    netAmount: 0,
  });
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchSuppliersAndItems = async () => {
      const supplierList = await getAllSupplier();
      const itemList = await getAllItem();
      setSuppliers(supplierList);
      setItems(itemList);
    };
    fetchSuppliersAndItems();
  }, []);

  const handleSupplierChange = (e) => {
    setOrderData((prev) => ({ ...prev, supplier: e.target.value }));
  };

  const handleItemSelect = (e) => {
    const itemId = e.target.value;
    const selectedItem = items.find((item) => item._id === itemId);

    if (selectedItem && !selectedItems.some((item) => item.itemId === itemId)) {
      const newItem = {
        itemId,
        itemName: selectedItem.itemName,
        unitPrice: selectedItem.unitPrice,
        stockUnit: selectedItem.stockUnit,
        orderQty: 1,
        discount: 0,
        itemAmount: selectedItem.unitPrice,
        netAmount: selectedItem.unitPrice,
      };
      setSelectedItems([...selectedItems, newItem]);
    }
  };

  const handleQuantityChange = (index, qty) => {
    const updatedItems = selectedItems.map((item, i) =>
      i === index
        ? {
            ...item,
            orderQty: qty,
            itemAmount: qty * item.unitPrice,
            netAmount: qty * item.unitPrice - item.discount,
          }
        : item
    );
    setSelectedItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const handleDiscountChange = (index, discount) => {
    const updatedItems = selectedItems.map((item, i) =>
      i === index
        ? {
            ...item,
            discount,
            netAmount: item.itemAmount - discount,
          }
        : item
    );
    setSelectedItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const calculateTotals = (updatedItems) => {
    const itemTotal = updatedItems.reduce((sum, item) => sum + item.itemAmount, 0);
    const discountTotal = updatedItems.reduce((sum, item) => sum + item.discount, 0);
    const netAmount = itemTotal - discountTotal;
    setOrderData((prev) => ({ ...prev, itemTotal, discountTotal, netAmount }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseOrderData = {
      supplier: orderData.supplier, 
      itemTotal: orderData.itemTotal,
      discountTotal: orderData.discountTotal,
      netAmount: orderData.netAmount,
      itemList: selectedItems.map(item => ({
        item: item.itemId,
        orderQty: item.orderQty,
        discount: item.discount,
        itemAmount: item.itemAmount,
        netAmount: item.netAmount,
      })),
    };

    try {
      await createPurchaseOrder(purchaseOrderData);
      alert('Purchase Order Created Successfully');
     
      setOrderData({
        supplier: '',
        itemTotal: 0,
        discountTotal: 0,
        netAmount: 0,
      });
      setSelectedItems([]);
    } catch (error) {
      console.error('Error creating purchase order:', error);
    }
  };

  const handleExport = async () => {
    if (!orderData.supplier) {
      alert('Please select a supplier before exporting.');
      return;
    }

    try {
      const response = await exportPurchaseOrder(orderData.supplier); 
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'purchase_order.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error exporting purchase order:', error);
      alert('Failed to export purchase order.');
    }
  };

  return (
    <div className="container mx-auto p-6 rounded-lg  w-3/4 ml-72">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Purchase Order</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg ">
        <label className="block mb-2 font-medium">Supplier</label>
        <select onChange={handleSupplierChange} value={orderData.supplier} className="p-2 border rounded mb-4 w-full" required>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Select Item</label>
        <select onChange={handleItemSelect} className="p-2 border rounded mb-4 w-full">
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.itemName}
            </option>
          ))}
        </select>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
          {selectedItems.length === 0 ? (
            <p>No items selected</p>
          ) : (
            selectedItems.map((item, index) => (
              <div key={index} className="flex space-x-4 items-center mb-2 border-b pb-2">
                <span className="flex-1">{item.itemName}</span>
                <input
                  type="number"
                  min="1"
                  value={item.orderQty}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  className="p-2 border rounded w-16"
                />
                <input
                  type="number"
                  min="0"
                  value={item.discount}
                  onChange={(e) => handleDiscountChange(index, parseFloat(e.target.value))}
                  className="p-2 border rounded w-16"
                />
                <span className="flex-1">Total: {item.netAmount.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-4">
          <p className="font-medium">Item Total: {orderData.itemTotal.toFixed(2)}</p>
          <p className="font-medium">Discount Total: {orderData.discountTotal.toFixed(2)}</p>
          <p className="font-medium">Net Amount: {orderData.netAmount.toFixed(2)}</p>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Create Order
        </button>
        <button type="button" onClick={handleExport} className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-2">
          Export Order
        </button>
      </form>
    </div>
  );
};

export default CreatePurchaseOrder;

