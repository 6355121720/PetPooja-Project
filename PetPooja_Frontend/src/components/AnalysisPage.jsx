
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { FaBoxes, FaChartPie, FaChartBar, FaDownload, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');


  
  const generatePastelColor = (seed) => {
    // Generate a consistent pastel color based on string seed
    const stringToNumber = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = stringToNumber % 360;
    return {
      background: `hsla(${hue}, 70%, 80%, 0.8)`,
      border: `hsla(${hue}, 70%, 70%, 1)`,
      hover: `hsla(${hue}, 70%, 75%, 0.9)`
    };
  };

  const getItemColor = (itemName) => {
    const colorCache = {};
    
    if (!colorCache[itemName]) {
      colorCache[itemName] = generatePastelColor(itemName);
    }
    
    return colorCache[itemName];
  };
  

  const [inventoryData, setInventoryData] = useState({
    // "banana": { quantity: 8, isWaste: true },
    // "apple": { quantity: 12, isWaste: false },
    // "orange": { quantity: 5, isWaste: true },
    // "mango": { quantity: 15, isWaste: false }
  });

  useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_API}/api/v1/record/todayrecord`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("API Response:", res);
              setInventoryData(res.data);
          })
          .catch((error) => console.error("Error fetching inventory data:", error));
      }, []);

  const processedData = Object.entries(inventoryData).map(([name, data]) => ({
    name,
    quantity: data.quantity,
    isWaste: data.isWaste
  }));

  const totalQuantity = processedData.reduce((sum, item) => sum + item.quantity, 0);
  const wastedQuantity = processedData
    .filter(item => item.isWaste)
    .reduce((sum, item) => sum + item.quantity, 0);
  const wastePercentage = totalQuantity > 0 ? 
    ((wastedQuantity / totalQuantity) * 100).toFixed(1) : 0;

  // const chartData = {
  //   labels: processedData.map(p => p.name),
  //   datasets: [{
  //     data: processedData.map(p => p.quantity),
  //     backgroundColor: processedData.map(p => p.isWaste ? 
  //       'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.8)'
  //     ),
  //     borderColor: processedData.map(p => p.isWaste ? 
  //       'rgba(239, 68, 68, 1)' : 'rgba(16, 185, 129, 1)'
  //     ),
  //     borderWidth: 1,
  //   }]
  // };

  const chartData = {
    labels: processedData.map(p => p.name),
    datasets: [{
      data: processedData.map(p => p.quantity),
      backgroundColor: processedData.map(p => 
        getItemColor(p.name.toLowerCase()).background
      ),
      borderColor: processedData.map(p => 
        getItemColor(p.name.toLowerCase()).border
      ),
      borderWidth: 1,
    }]
  };
  


  // const barData = {
  //   labels: processedData.map(p => p.name),
  //   datasets: [{
  //     label: 'Quantity',
  //     data: processedData.map(p => p.quantity),
  //     backgroundColor: processedData.map(p => p.isWaste ? 
  //       'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.8)'
  //     ),
  //     borderColor: processedData.map(p => p.isWaste ? 
  //       'rgba(239, 68, 68, 1)' : 'rgba(16, 185, 129, 1)'
  //     ),
  //     borderWidth: 1,
  //     borderRadius: 4,
  //   }]
  // };

  // Update barData
const barData = {
  labels: processedData.map(p => p.name),
  datasets: [{
    label: 'Quantity',
    data: processedData.map(p => p.quantity),
    backgroundColor: processedData.map(p => 
      getItemColor(p.name.toLowerCase()).background
    ),
    borderColor: processedData.map(p => 
      getItemColor(p.name.toLowerCase()).border
    ),
    borderWidth: 1,
    borderRadius: 4,
  }]
};


  const downloadExcel = () => {
    const excelData = processedData.map(item => ({
      'Item Name': item.name,
      'Quantity': item.quantity,
      'Status': item.isWaste ? 'Waste' : 'Good'
    }));

    // const worksheet = XLSXUtils.json_to_sheet(excelData);

    // const range = XLSXUtils.decode_range(worksheet['!ref']);
    // for (let C = range.s.c; C <= range.e.c; ++C) {
    //   const address = XLSXUtils.encode_cell({ r: 0, c: C });
    //   if (!worksheet[address]) continue;
    //   worksheet[address].s = { font: { bold: true } };
    // }

    const columnWidths = [
      { wch: 15 }, 
      { wch: 12 }, 
      { wch: 12 }
    ];
    // worksheet['!cols'] = columnWidths;

    // const workbook = XLSXUtils.book_new();
    // XLSXUtils.book_append_sheet(workbook, worksheet, 'Inventory Data');

    // const excelBuffer = XLSXWrite(workbook, { bookType: 'xlsx', type: 'array' });
    const date = new Date().toISOString().split('T')[0];
    const fileName = `inventory_report_${date}.xlsx`;

    // const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleNavigateToInventory = () => {
    navigate('/inventory');
  };

  const colors = [
    { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
    { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20" },
    { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
    { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  
  // Replace ITEM_COLORS constant with this

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">Inventory Analysis</h1>
        <p className="text-gray-400">Track and analyze your inventory usage and waste</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Items</h3>
          <p className="text-3xl font-bold text-gray-100">{totalQuantity}</p>
          <p className="text-sm text-gray-500 mt-2">Total quantity in system</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Good Condition</h3>
          <p className="text-3xl font-bold text-green-400">{totalQuantity - wastedQuantity}</p>
          <p className="text-sm text-gray-500 mt-2">Items in good condition</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Waste</h3>
          <p className="text-3xl font-bold text-red-400">
            {wastedQuantity}
            <span className="text-lg ml-2">({wastePercentage}%)</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">Items marked as waste</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700"
          style={{ height: '400px' }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-900/50 rounded-lg">
              <FaChartPie className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100">Inventory Distribution</h3>
          </div>
          <div className="h-[300px]">
            {loading ? (
              <div className="animate-pulse flex justify-center items-center h-full bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Pie data={chartData} options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                      font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                      },
                      color: '#D1D5DB'
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    titleColor: '#F3F4F6',
                    bodyColor: '#D1D5DB',
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: true,
                    boxWidth: 8,
                    boxHeight: 8,
                    usePointStyle: true,
                    titleFont: {
                      size: 12,
                      family: "'Inter', sans-serif",
                      weight: '600'
                    },
                    bodyFont: {
                      size: 11,
                      family: "'Inter', sans-serif"
                    },
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        label += context.parsed.y?.toLocaleString() || context.parsed?.toLocaleString() || '';
                        return label;
                      }
                    }
                  }
                },
                maintainAspectRatio: false,
                responsive: true,
              }} />
            )}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700"
          style={{ height: '400px' }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-900/50 rounded-lg">
              <FaChartBar className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100">Usage vs Waste</h3>
          </div>
          <div className="h-[300px]">
            {loading ? (
              <div className="animate-pulse flex justify-center items-center h-full bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Bar data={barData} options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                      font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                      },
                      color: '#D1D5DB'
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    titleColor: '#F3F4F6',
                    bodyColor: '#D1D5DB',
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: true,
                    boxWidth: 8,
                    boxHeight: 8,
                    usePointStyle: true,
                    titleFont: {
                      size: 12,
                      family: "'Inter', sans-serif",
                      weight: '600'
                    },
                    bodyFont: {
                      size: 11,
                      family: "'Inter', sans-serif"
                    },
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        label += context.parsed.y?.toLocaleString() || context.parsed?.toLocaleString() || '';
                        return label;
                      }
                    }
                  }
                },
                maintainAspectRatio: false,
                responsive: true,
              }} />
            )}
          </div>
        </motion.div>
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Detailed Inventory
          </h2>
          {/* <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavigateToInventory}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                transition-colors duration-200 rounded-lg text-white text-sm font-medium"
            >
              <FaEdit className="h-4 w-4" />
              <span>Edit Inventory</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={downloadExcel}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                transition-colors duration-200 rounded-lg text-white text-sm font-medium"
            >
              <FaDownload className="h-4 w-4" />
              <span>Download Excel</span>
            </motion.button>
          </div> */}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">Item</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {processedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="text-gray-300 font-medium">{item.quantity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${randomColor.bg} ${randomColor.text} ${randomColor.border}`}>
                      {item.isWaste ? 'Waste' : 'Good'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;