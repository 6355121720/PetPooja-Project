import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { InventoryProvider } from "./contexts/InventoryContext";
import Header from "./components/Header.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import AnalysisPage from "./components/AnalysisPage.jsx";
import Inventory from "./components/Inventory.jsx";
import Layout from "./components/Layout";
import RecipeAssistant from "./components/RecipeAssistant.jsx";
import UploadBad from "./components/UploadBad.jsx"; 
import UploadGood from "./components/UploadGood.jsx";
import CustomRecipe from "./components/CustomRecipe.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route
              path="/profile"
              element={
                // <ProtectedRoute>
                  <Layout><ProfilePage /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                // <ProtectedRoute>
                  <Layout><Inventory /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                // <ProtectedRoute>
                  <Layout><AnalysisPage /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/recipeassistant"
              element={
                // <ProtectedRoute>
                  <Layout><RecipeAssistant /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route 
              path="/uploadfresh"
              element={
                <Layout><UploadGood/></Layout>
              }
            />
            <Route 
              path="/uploadspoiled"
              element={
                <Layout><UploadBad/></Layout>
              }
            />
            <Route
              path='/customrecipe'
              element={
                <Layout><CustomRecipe/></Layout>
              }
            />
          </Routes>
        </Router>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;