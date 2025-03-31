// pages/Dashboard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBoxes, FaChartPie, FaUtensils, FaRegBell, FaArrowRight } from 'react-icons/fa';
import {useState, useEffect} from 'react'

export default function Dashboard() {
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_API}/api/v1/record/todayrecord`, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setInventory(res.data)          
            setInventory(Object.entries(res.data).map(([key, value]) => ({ name: key, quantity: value.quantity })));
            return res;
        })
        // .then((re) => {
        //     console.log(inventory);
        // })
        .catch((err) => {
            console.log(err);
        })
    }, []);
    
    // Calculate inventory stats
    const totalItems = inventory?.length || 0;
    const lowStockItems =  inventory.filter((item) => item.quantity < 10)?.length || 0;
    // const lowStockItems = inventory.filter(item => item.quantity < 10).length;
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-100 mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome to SmartBites Dashboard</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-500/10 to-purple-900/20 p-6 rounded-2xl border border-purple-700/50"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-purple-400">Total Items</h3>
                        <FaBoxes className="text-purple-400 text-xl" />
                    </div>
                    <p className="text-3xl font-bold text-white">{totalItems}</p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-red-500/10 to-red-900/20 p-6 rounded-2xl border border-red-700/50"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-red-400">Low Stock</h3>
                        <FaRegBell className="text-red-400 text-xl" />
                    </div>
                    <p className="text-3xl font-bold text-white">{lowStockItems}</p>
                </motion.div>
            </div>

            {/* Main Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/inventory">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-purple-400">
                                Inventory Management
                            </h3>
                            <FaBoxes className="text-purple-400 text-xl" />
                        </div>
                        <p className="text-gray-400 mb-4">
                            Track and manage your inventory items with ease
                        </p>
                        <div className="flex items-center text-purple-400 text-sm">
                            <span>Go to Inventory</span>
                            <FaArrowRight className="ml-2" />
                        </div>
                    </motion.div>
                </Link>

                <Link to="/analysis">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-cyan-400">
                                Analytics & Insights
                            </h3>
                            <FaChartPie className="text-cyan-400 text-xl" />
                        </div>
                        <p className="text-gray-400 mb-4">
                            Get detailed analytics and waste predictions
                        </p>
                        <div className="flex items-center text-cyan-400 text-sm">
                            <span>View Analytics</span>
                            <FaArrowRight className="ml-2" />
                        </div>
                    </motion.div>
                </Link>

                <Link to="/recipeassistant">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-pink-400">
                                Recipe Assistant
                            </h3>
                            <FaUtensils className="text-pink-400 text-xl" />
                        </div>
                        <p className="text-gray-400 mb-4">
                            Get AI-powered recipe suggestions
                        </p>
                        <div className="flex items-center text-pink-400 text-sm">
                            <span>Explore Recipes</span>
                            <FaArrowRight className="ml-2" />
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* Recent Activity or Additional Info */}
            <div className="mt-8 bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        Keep track of your inventory to minimize waste
                    </li>
                    <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                        Check analytics regularly for insights
                    </li>
                    <li className="flex items-center">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                        Use the recipe assistant for meal planning
                    </li>
                </ul>
            </div>
        </div>
    );
}