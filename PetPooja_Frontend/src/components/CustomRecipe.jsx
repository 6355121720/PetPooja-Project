// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaChartPie,
//   FaBoxOpen,
//   FaTrashAlt,
//   FaQuestionCircle,
//   FaRobot,
//   FaSpinner,
//   FaUtensils,
//   FaPlus,
// } from "react-icons/fa";
// import { useInventory } from "../contexts/InventoryContext";
// import axios from "axios";

// const CustomRecipe = () => {
//   const { inventory } = useInventory();
//   const [aiAnalysis, setAiAnalysis] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [userPreferences, setUserPreferences] = useState({
//     cuisine: "Indian",
//     dietaryRestrictions: "",
//     mealType: "",
//     cookingTime: "",
//     spiceLevel: "medium",
//   });
//   const [manualIngredients, setManualIngredients] = useState([""]);

//   const handlePreferenceChange = (e) => {
//     const { name, value } = e.target;
//     setUserPreferences(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleIngredientChange = (index, value) => {
//     const updatedIngredients = [...manualIngredients];
//     updatedIngredients[index] = value;
//     setManualIngredients(updatedIngredients);
//   };

//   const addIngredientField = () => {
//     setManualIngredients([...manualIngredients, ""]);
//   };

//   const generateAIAnalysis = async () => {
//     // Combine inventory items and manually entered ingredients
//     // const inventoryItems = inventory.map(item => `${item.name}: ${item.quantity}`);
//     const allIngredients = [ ...manualIngredients.filter(i => i.trim())];
    
//     if (allIngredients.length === 0) {
//       setAiAnalysis("Please add ingredients first.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const prompt = `
//         Based on my current ingredients:
//         ${allIngredients.join("\n")}
//         give me some recipes(3-5)
//         in format recipe : ingredients
//         in clean manner 
//       `;

//       const response = await axios({
//         url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAHTdu2FFqlJ4cxBp2ifOUC3x4zHSNXvlY',
//         method: "post",
//         withCredentials: false,
//         data: {
//           contents: [{ parts: [{ text: prompt }] }],
//         },
//       });
      
//       const responseText = response.data.candidates[0].content.parts[0].text;
//       setAiAnalysis(responseText);
//     } catch (error) {
//       console.error(error);
//       setAiAnalysis(error, "Unable to generate recipes at the moment. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800"
//     >
//       {/* Header Section */}
//       <div className="max-w-4xl mx-auto mb-8">
//         <h1 className="text-4xl font-bold text-gray-100 mb-2">
//           Recipe Assistant
//         </h1>
//         <p className="text-gray-400">
//           Get personalized recipe suggestions based on your inventory and preferences
//         </p>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* User Preferences Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
//         >
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-2 bg-purple-900/30 rounded-lg">
//               <FaQuestionCircle className="w-6 h-6 text-purple-400" />
//             </div>
//             <h2 className="text-xl font-semibold text-purple-300">
//               Your Preferences
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-400 text-sm mb-1">Cuisine</label>
//               <select
//                 name="cuisine"
//                 value={userPreferences.cuisine}
//                 onChange={handlePreferenceChange}
//                 className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="Indian">Indian</option>
//                 <option value="Italian">Italian</option>
//                 <option value="Mexican">Mexican</option>
//                 <option value="Chinese">Chinese</option>
//                 <option value="Mediterranean">Mediterranean</option>
//                 <option value="American">American</option>
//               </select>
//             </div>

//             {/* Other preference inputs remain the same */}
//             {/* ... */}
//           </div>
//         </motion.div>

//         {/* Ingredients Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
//         >
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-2 bg-blue-900/30 rounded-lg">
//               <FaBoxOpen className="w-6 h-6 text-blue-400" />
//             </div>
//             <h2 className="text-xl font-semibold text-blue-300">
//               Available Ingredients
//             </h2>
//           </div>

//           {/* Inventory Items */}
//           <div className="mb-6">
//             {/* <h3 className="text-gray-300 mb-2">From Your Inventory:</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {inventory.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-300">{item.name}</span>
//                     <span className="text-purple-400 font-medium">
//                       {item.quantity}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div> */}
//           </div>

//           {/* Manual Ingredients Input */}
//           <div>
//             <h3 className="text-gray-300 mb-2">Additional Ingredients:</h3>
//             <div className="space-y-3">
//               {manualIngredients.map((ingredient, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     value={ingredient}
//                     onChange={(e) => handleIngredientChange(index, e.target.value)}
//                     placeholder="Enter ingredient name"
//                     className="flex-1 bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               ))}
//               <button
//                 onClick={addIngredientField}
//                 className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-2"
//               >
//                 <FaPlus /> Add another ingredient
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Generate Button */}
//         <div className="flex justify-center">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={generateAIAnalysis}
//             disabled={isLoading || (inventory.length === 0 && manualIngredients.every(i => !i.trim()))}
//             className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
//           >
//             {isLoading ? (
//               <>
//                 <FaSpinner className="animate-spin" />
//                 <span>Generating...</span>
//               </>
//             ) : (
//               <>
//                 <FaRobot />
//                 <span>Get Recipes</span>
//               </>
//             )}
//           </motion.button>
//         </div>

//         {/* AI Recipe Suggestions */}
//         {aiAnalysis && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
//           >
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="p-2 bg-green-900/30 rounded-lg">
//                 <FaUtensils className="w-6 h-6 text-green-400" />
//               </div>
//               <h2 className="text-xl font-semibold text-green-300">
//                 Recipe Suggestions
//               </h2>
//             </div>
//             <div className="prose prose-invert max-w-none">
//               <div 
//                 className="text-gray-200 whitespace-pre-wrap"
//                 dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/\n/g, '<br />') }}
//               />
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default CustomRecipe;



import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaQuestionCircle,
  FaRobot,
  FaSpinner,
  FaUtensils,
  FaPlus,
  FaTimes
} from "react-icons/fa";
import axios from "axios";

const CustomRecipe = () => {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    cuisine: "Indian",
  });
  const [manualIngredients, setManualIngredients] = useState([""]);

  // Store API key locally
  const apiKey = "AIzaSyAHTdu2FFqlJ4cxBp2ifOUC3x4zHSNXvlY"; 
  const handlePreferenceChange = (e) => {
    setUserPreferences(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...manualIngredients];
    updatedIngredients[index] = value;
    setManualIngredients(updatedIngredients);
  };

  const addIngredientField = () => {
    setManualIngredients([...manualIngredients, ""]);
  };

  const removeIngredientField = (index) => {
    const updatedIngredients = [...manualIngredients];
    updatedIngredients.splice(index, 1);
    setManualIngredients(updatedIngredients);
  };

  const generateRecipes = async () => {
    const ingredients = manualIngredients.filter(i => i.trim());

    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiAnalysis("");

    try {
      const prompt = `
        Suggest some ${userPreferences.cuisine} recipes using these ingredients:
        ${ingredients.join(', ')}.

        Format each recipe as:
        Recipe Name: ingredient1, ingredient2, ingredient3

        Don't include or add any preparation steps or additional text.
        also dont add any line about these are the cuisine dishes just directly give the dishes in format as i asked
        NOTE : If you find anything vulgar thing or any thing not related to food simply dont answer and return a simple statement about not having any knwoledge about it
      `;

      console.log("Sending prompt to API:", prompt);
      console.log("API Key:", apiKey);

      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAHTdu2FFqlJ4cxBp2ifOUC3x4zHSNXvlY',
        method: "post",
        params: {
          key: apiKey,
        },
        withCredentials: false,
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      console.log("API Response:", response.data);

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        console.error("No text received from API");
        throw new Error("No recipes generated");
      }

      setAiAnalysis(text);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to generate recipes. Please try again.");
      setAiAnalysis(getFallbackRecipes());
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackRecipes = () => {
    const ingredients = manualIngredients.filter(i => i.trim());
    if (ingredients.length === 0) return "";

    return `
Paneer Tikka: paneer, bell peppers, yogurt, spices
Dal Tadka: lentils, onions, tomatoes, spices
Vegetable Biryani: rice, mixed vegetables, spices
    `;
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
          Get personalized recipe suggestions based on your ingredients
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cuisine Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <FaQuestionCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-purple-300">
              Cuisine Preference
            </h2>
          </div>
          <select
            name="cuisine"
            value={userPreferences.cuisine}
            onChange={handlePreferenceChange}
            className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
          </select>
        </motion.div>

        {/* Ingredients Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-900/30 rounded-lg">
              <FaBoxOpen className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-blue-300">
              Add Ingredients
            </h2>
          </div>

          <div className="space-y-3">
            {manualIngredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder="Enter ingredient name"
                  className="flex-1 bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {manualIngredients.length > 1 && (
                  <button
                    onClick={() => removeIngredientField(index)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addIngredientField}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-2"
            >
              <FaPlus /> Add ingredient
            </button>
          </div>
        </motion.div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateRecipes}
            disabled={isLoading || manualIngredients.every(i => !i.trim())}
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

        {/* Recipe Results */}
        {aiAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-900/30 rounded-lg">
                <FaUtensils className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-green-300">
                Suggested Recipes
              </h2>
            </div>

            <div className="space-y-6">
              {aiAnalysis
                .split('\n')
                .filter(line => line.trim() && line.includes(':'))
                .map((recipeLine, index) => {
                  const [recipe, ingredients] = recipeLine.split(':').map(part => part.trim());
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
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomRecipe;