// Path: dms-frontend/src/pages/LandingPage.jsx
// Landing Page for Disaster Management System
// Features video background, professional navbar, and call-to-action

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const LandingPage = () => {
    const [stats, setStats] = useState({
        totalIncidents: 0,
        activeIncidents: 0,
        resolvedIncidents: 0,
        registeredUsers: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch public statistics for landing page
    useEffect(() => {
        const fetchPublicStats = async () => {
            try {
                // Fetch incidents for public statistics
                const response = await axiosInstance.get('/incidents/');
                const incidents = response.data;
                
                setStats({
                    totalIncidents: incidents.length,
                    activeIncidents: incidents.filter(i => i.status !== 'resolved').length,
                    resolvedIncidents: incidents.filter(i => i.status === 'resolved').length,
                    registeredUsers: 150 // Placeholder - could be fetched from backend
                });
                setLoading(false);
            } catch (err) {
                console.log('Could not fetch public stats:', err);
                // Use default stats if API fails
                setStats({
                    totalIncidents: 25,
                    activeIncidents: 8,
                    resolvedIncidents: 17,
                    registeredUsers: 150
                });
                setLoading(false);
            }
        };

        fetchPublicStats();
    }, []);

    return (
      <div className="min-h-screen relative overflow-hidden bg-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Video Background */}
          <video autoPlay muted loop className="w-full h-full object-cover opacity-40">
            <source src="/DMS - SAMPLE WEBSITE VIDEO.mp4" type="video/mp4" />
          </video>
          {/* Fallback gradient if video doesn't load */}
          <div className="w-full h-full bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700 opacity-40 absolute inset-0 -z-10"></div>
          
          {/* Modern Geometric Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-red-900/20"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex flex-col">
          {/* Modern Glassmorphism Navbar */}
          <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                {/* Modern Logo */}
                <div className="flex items-center group">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                      <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">⚡</span>
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <h1 className="text-white font-black text-2xl tracking-tight">
                      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        CRISIS
                      </span>
                      <span className="text-white">HUB</span>
                    </h1>
                    <p className="text-gray-300 text-xs font-medium tracking-wider">
                      EMERGENCY RESPONSE SYSTEM
                    </p>
                  </div>
                </div>

                {/* Modern Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                  {['Features', 'Response', 'Analytics', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                    >
                      {item}
                    </a>
                  ))}
                </div>

                {/* Modern Auth Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-white hover:text-cyan-300 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:scale-105"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Modern Hero Section */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-6xl mx-auto">
              
              {/* Status Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30 mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">SYSTEM OPERATIONAL • 24/7 MONITORING</span>
              </div>

              {/* Main Headline */}
              <div className="mb-12">
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight">
                  <span className="block">EMERGENCY</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    RESPONSE
                  </span>
                  <span className="block text-4xl md:text-5xl font-light text-gray-300 mt-4">
                    Reimagined
                  </span>
                </h1>
                
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light">
                    Next-generation crisis management platform powered by 
                    <span className="text-cyan-400 font-semibold"> real-time intelligence</span>, 
                    <span className="text-purple-400 font-semibold"> AI coordination</span>, and 
                    <span className="text-orange-400 font-semibold"> instant response</span>.
                  </p>
                </div>
              </div>

              {/* Modern CTA Section */}
              <div className="mb-16">
                <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                  <button
                    onClick={() => navigate("/register")}
                    className="group relative bg-gradient-to-r from-red-500 via-orange-500 to-red-600 hover:from-red-600 hover:via-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-red-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative flex items-center space-x-3">
                      <span className="text-2xl">🚨</span>
                      <span>REPORT EMERGENCY</span>
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                  </button>
                  
                  <div className="text-gray-400 font-medium">OR</div>
                  
                  <button
                    onClick={() => navigate("/login")}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-cyan-400/50 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">⚡</span>
                      </div>
                      <span>ACCESS COMMAND CENTER</span>
                    </div>
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm mt-6">
                  Trusted by <span className="text-cyan-400 font-semibold">500+</span> emergency services worldwide
                </p>
              </div>

              {/* Modern Statistics Dashboard */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {[
                  {
                    label: "INCIDENTS MANAGED",
                    value: stats.totalIncidents,
                    icon: "📊",
                    color: "from-blue-500 to-cyan-500",
                    bgColor: "bg-blue-500/10",
                    borderColor: "border-blue-400/30"
                  },
                  {
                    label: "ACTIVE RESPONSES",
                    value: stats.activeIncidents,
                    icon: "⚡",
                    color: "from-orange-500 to-red-500",
                    bgColor: "bg-orange-500/10",
                    borderColor: "border-orange-400/30"
                  },
                  {
                    label: "LIVES SAVED",
                    value: stats.resolvedIncidents * 3,
                    icon: "💖",
                    color: "from-green-500 to-emerald-500",
                    bgColor: "bg-green-500/10",
                    borderColor: "border-green-400/30"
                  },
                  {
                    label: "RESPONSE TIME",
                    value: "< 2",
                    unit: "MIN",
                    icon: "⏱️",
                    color: "from-purple-500 to-pink-500",
                    bgColor: "bg-purple-500/10",
                    borderColor: "border-purple-400/30"
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`${stat.bgColor} backdrop-blur-xl rounded-2xl p-6 border ${stat.borderColor} hover:scale-105 transition-all duration-300 group`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white text-xl">{stat.icon}</span>
                      </div>
                      <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-2 flex items-baseline">
                      {loading ? "..." : stat.value}
                      {stat.unit && <span className="text-sm font-medium text-gray-400 ml-1">{stat.unit}</span>}
                    </div>
                    <div className="text-gray-400 text-xs font-medium tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modern Footer */}
          <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Emergency Contacts */}
                <div className="text-center md:text-left">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center justify-center md:justify-start">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    EMERGENCY HOTLINES
                  </h3>
                  <div className="space-y-2">
                    {[
                      { service: "Police Emergency", number: "100", icon: "🚔" },
                      { service: "Fire Department", number: "101", icon: "🚒" },
                      { service: "Medical Emergency", number: "108", icon: "🚑" },
                      { service: "Disaster Helpline", number: "1078", icon: "🆘" }
                    ].map((contact, index) => (
                      <div key={index} className="flex items-center justify-center md:justify-start space-x-3 text-gray-300 hover:text-white transition-colors">
                        <span className="text-lg">{contact.icon}</span>
                        <span className="text-sm font-medium">{contact.service}:</span>
                        <span className="text-cyan-400 font-bold">{contact.number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg mb-4">QUICK ACCESS</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate("/register")}
                      className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 hover:scale-105"
                    >
                      🚨 Report Emergency
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 hover:scale-105"
                    >
                      ⚡ Command Center
                    </button>
                  </div>
                </div>

                {/* System Status */}
                <div className="text-center md:text-right">
                  <h3 className="text-white font-bold text-lg mb-4">SYSTEM STATUS</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-sm font-medium">All Systems Operational</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-300 text-sm font-medium">24/7 Monitoring Active</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-purple-300 text-sm font-medium">AI Response Ready</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="border-t border-white/10 mt-8 pt-6 text-center">
                <p className="text-gray-400 text-sm">
                  © 2024 CrisisHub Emergency Response System. 
                  <span className="text-cyan-400 font-medium"> Saving lives through technology.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default LandingPage;
