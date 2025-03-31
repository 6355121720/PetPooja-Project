import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChartPie,
  FaBoxOpen,
  FaTrashAlt,
  FaQuestionCircle,
  FaRobot,
  FaSpinner,
  FaUtensils,
} from "react-icons/fa";
// import { useInventory } from "../contexts/InventoryContext";
import axios from "axios";

const RecipeAssistant = () => {
  // const { inventory } = useInventory();
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
              setInventory(Object.entries(res.data).map(([key, value]) => ({ name:key, quantity: value.quantity })));
              return res;
          })
          // .then((re) => {
          //     console.log(inventory);
          // })
          .catch((err) => {
              console.log(err);
          })
      }, []);

  setTimeout(() => {
    console.log(inventory)
  }, 3000)


  const generateAIAnalysis = async () => {
    setIsLoading(true);
    try {
      const stockSummary = inventory
        .map((p) => `${p.name}: ${p.quantity}`)
        .join("\n");
      const prompt = `Based on my current kitchen inventory:${stockSummary} suggest me some recipes( indian if possible)(don't make weird things) with its ingredients in format recipe : ingredients don't give extra text give only in simple text don't bold it`;
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAHTdu2FFqlJ4cxBp2ifOUC3x4zHSNXvlY`,
        method: "post",
        withCredentials: false,
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });
      console.log(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
      
      setAiAnalysis(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);

      setAiAnalysis(
        "Unable to generate analysis at the moment. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800"
    >
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">
          Recipe Assistant
        </h1>
        <p className="text-gray-400">
          Get personalized recipe suggestions based on your inventory
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Inventory Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <FaBoxOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-purple-300">
              Available Ingredients
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {inventory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-purple-400 font-medium">
                    {item.quantity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Recipe Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-900/30 rounded-lg">
                <FaUtensils className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-blue-300">
                Recipe Suggestions
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateAIAnalysis}
              disabled={isLoading || inventory.length === 0}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FaRobot className="w-5 h-5" />
                  <span>Get Recipes</span>
                </>
              )}
            </motion.button>
          </div>

          {inventory.length === 0 && (
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-4">
              <p className="text-yellow-300 text-sm">
                Please add ingredients to your inventory to get recipe
                suggestions.
              </p>
            </div>
          )}
          {aiAnalysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {aiAnalysis
                .split('\n')
                .filter(line => line.trim() !== '')
                .map((line, index) => {
                  const [recipe, ingredients] = line.split(':').map(part => part.trim());
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 group-hover:scale-110 transition-transform duration-300">
                          <FaUtensils className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-xl font-bold text-gray-100 group-hover:text-green-300 transition-colors duration-300">
                            {recipe}
                          </h3>
                          {ingredients && (
                            <div className="flex flex-wrap gap-2">
                              {ingredients.split(',').map((ingredient, idx) => (
                                <motion.span
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                                  className="px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-lg text-sm text-green-300 flex items-center gap-2 border border-gray-700/30 hover:border-green-500/30 hover:bg-gray-800/80 transition-all duration-300"
                                >
                                  <FaBoxOpen className="w-3.5 h-3.5 opacity-70" />
                                  {ingredient.trim()}
                                </motion.span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecipeAssistant;
