import React, { createContext, useContext, useState } from 'react';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Tomatoes', quantity: 100 },
    { id: '2', name: 'Strawberry', quantity: 150 },
    { id: '3', name: 'Chicken', quantity: 80 },
  ]);

  const addItem = (newItem) => {
    setInventory([...inventory, { 
      ...newItem, 
      id: Date.now().toString(),
      quantity: parseInt(newItem.quantity)
    }]);
  };

  const updateItem = (id, updatedItem) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    updateItem(id, { quantity: parseInt(newQuantity) });
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      addItem,
      updateItem,
      deleteItem,
      updateQuantity
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};