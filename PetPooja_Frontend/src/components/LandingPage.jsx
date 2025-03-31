import React from "react";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      title: "AI Inventory Tracking",
      icon: "📷",
      content: "Real-time ingredient monitoring using computer vision",
    },
    {
      title: "Waste Prediction",
      icon: "📈",
      content: "ML-powered forecasts to reduce food spoilage",
    },
    {
      title: "Smart Menu Engine",
      icon: "🧠",
      content: "Dynamic recipe suggestions based on stock levels",
    },
  ];

  const benefits = [
    {
      step: "1",
      title: "Install Sensors",
      content: "Non-invasive camera setup in storage areas",
    },
    {
      step: "2",
      title: "AI Analysis",
      content: "Real-time inventory tracking & predictions",
    },
    {
      step: "3",
      title: "Optimize",
      content: "Automated purchasing & menu suggestions",
    },
  ];

  const stats = [
    { number: "40%", label: "Waste Reduction" },
    { number: "25%", label: "Cost Savings" },
    { number: "90%", label: "Inventory Accuracy" },
    { number: "4h", label: "Daily Time Saved" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-gray-950 text-white font-sans antialiased">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-purple-900/50 pt-16">
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-snug">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
              AI-Powered Kitchen
            </span>
            <br />
            <span className="text-gray-100">Waste Reduction System</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto leading-normal">
            Transform your restaurant operations with computer vision and machine learning. 
            Minimize food waste, optimize inventory, and maximize profitability.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => scrollToSection('features')}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 text-sm"
            >
              Schedule Demo
            </button>
            <button
              onClick={() => scrollToSection('howtouse')}
              className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 font-bold py-3 px-8 rounded-full transition-colors duration-300 text-sm"
            >
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Smart Kitchen Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-8 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/30 transition-transform duration-300 hover:-translate-y-2 shadow-lg"
              >
                <div className="text-4xl mb-4 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To Use Section */}
      <section id="howtouse" className="py-16 bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 tracking-tight">
              Transform Your Kitchen in 3 Steps
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Seamless integration with existing kitchen infrastructure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="absolute inset-0 flex items-center justify-center md:block">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-gray-800 absolute top-1/2 -translate-y-1/2" />
            </div>
            {benefits.map((step, index) => (
              <div
                key={index}
                className="relative z-10 bg-gray-800 p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-center mt-6 mb-2 text-cyan-400 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center text-sm">
                  {step.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 border border-cyan-500/10 rounded-2xl transition-transform duration-300 hover:scale-105"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
              Powered By
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Express', 'React', 'AWS', 'REST API', 'MongoDB'].map((tech, index) => (
              <div
                key={index}
                className="px-6 py-2 bg-gray-800 rounded-full border border-cyan-500/20 text-cyan-400 text-sm hover:border-cyan-500/40 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                SmartBites
              </h3>
              <p className="text-gray-400 text-xs">
                Revolutionizing restaurant operations through AI innovation
              </p>
            </div>
            <div>
              <h4 className="text-gray-300 font-semibold mb-2 text-xs">
                Platform
              </h4>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">Dashboard</Link></li>
                <li><Link to="/inventory" className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">Inventory</Link></li>
                <li><Link to="/recipeassistant" className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">Recipe Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-semibold mb-2 text-xs">
                Resources
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">Features</button></li>
                <li><button onClick={() => scrollToSection('howtouse')} className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">How It Works</button></li>
                <li><a href="https://docs.smartbites.ai" className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-semibold mb-2 text-xs">
                Contact
              </h4>
              <div className="flex flex-col space-y-2">
                <a href="mailto:support@smartbites.ai" className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">Support</a>
                <a href="tel:+11234567890" className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">Sales</a>
                <a href="https://status.smartbites.ai" className="text-gray-400 hover:text-cyan-500 transition-colors duration-300 text-xs">System Status</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-4 text-center">
            <p className="text-gray-500 text-xs">
              © 2024 SmartBites Smart Kitchen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;