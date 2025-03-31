// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

// function Inventory() {
//   const [inventory, setInventory] = useState([])
//   const [search, setSearch] = useState('');
//   const [newItem, setNewItem] = useState({ name: '', quantity: '' });
//   const [showForm, setShowForm] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

//   useEffect(() => {
//           fetch(`${import.meta.env.VITE_BACKEND_API}/api/v1/record/todayrecord`, {
//               method:"POST",
//               headers:{
//                   'Content-Type': 'application/json'
//               }
//           })
//           .then((res) => {
//               return res.json()
//           })
//           .then((res) => {
//             setInventory(res.data)
//             setInventory(Object.entries(res.data).map(([key, value]) => ({ [key]: value })));
//             console.log(res.data)
//           })
//           .catch((err) => {
//               console.log(err)
//           })
//       }, [])


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-100">Inventory Management</h1>
//           <button
//             onClick={() => setShowForm(true)}
//             className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
//               transition-colors duration-200 rounded-lg text-white"
//           >
//             <FaPlus className="h-4 w-4" />
//             <span>Add Item</span>
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6 relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FaSearch className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search inventory..."
//             className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg
//               bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Add/Edit Item Form */}
//         {showForm && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700"
//           >
//             <form onSubmit={editingItem ? handleUpdate : handleSubmit} className="flex gap-4">
//               <input
//                 type="text"
//                 placeholder="Item name"
//                 className="flex-1 px-3 py-2 bg-gray-700 rounded-lg text-gray-300
//                   border border-gray-600 focus:outline-none focus:border-blue-500"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//               />
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 className="w-32 px-3 py-2 bg-gray-700 rounded-lg text-gray-300
//                   border border-gray-600 focus:outline-none focus:border-blue-500"
//                 value={newItem.quantity}
//                 onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//               >
//                 {editingItem ? 'Update' : 'Add'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingItem(null);
//                   setNewItem({ name: '', quantity: '' });
//                 }}
//                 className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg"
//               >
//                 Cancel
//               </button>
//             </form>
//           </motion.div>
//         )}

//         {/* Inventory Table */}
//         <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-700">
//             <thead>
//               <tr className="bg-gray-900">
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                   Item Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                   Quantity
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {inventory.map((item, index) => (
//                 <motion.tr
//                   key={item.name}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="hover:bg-gray-700/50"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     {item.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     {item.quantity}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                       item.quantity > 50 
//                         ? 'bg-green-900/50 text-green-400'
//                         : 'bg-red-900/50 text-red-400'
//                     }`}>
//                       {item.quantity > 50 ? 'In Stock' : 'Low Stock'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <div className="flex items-center justify-between">
//                       {/* Edit/Delete buttons on left */}
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => handleEdit(item)}
//                           className="p-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
//                           title="Edit"
//                         >
//                           <FaEdit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
//                           title="Delete"
//                         >
//                           <FaTrash className="h-4 w-4" />
//                         </button>
//                       </div>

//                       {/* Quantity controls on right */}
//                       <div className="flex items-center">
//                         <div className="flex items-center bg-gray-700/50 rounded-lg overflow-hidden ml-auto">
//                           <button
//                             onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
//                             className="px-2.5 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 border-r border-gray-600 transition-colors duration-200 font-medium"
//                             title="Decrease quantity"
//                           >
//                             -
//                           </button>
//                           <span className="px-4 py-1.5 text-gray-300 min-w-[48px] text-center font-medium">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="px-2.5 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 border-l border-gray-600 transition-colors duration-200 font-medium"
//                             title="Increase quantity"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Inventory;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/api/v1/record/todayrecord`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
          let temp = Object.entries(res.data).map(([key, value]) => ({ [key]: value }))
          setInventory(
          temp.map((item) => {
            const key = Object.keys(item)[0];
            return { name: key, ...item[key] };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Inventory Management</h1>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search inventory..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Inventory Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {inventory.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.quantity > 10 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                      {item.quantity > 10 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
