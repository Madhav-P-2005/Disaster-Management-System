// Path: dms-frontend/src/pages/Dashboard.jsx
// Main Dashboard Page for Disaster Management System
// Combines all dashboard components into a comprehensive overview

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import DashboardStats from '../components/dashboard/DashboardStats';
import IncidentList from '../components/dashboard/IncidentList';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
    // State management for dashboard data
    const [profile, setProfile] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch all dashboard data on component mount
    useEffect(() => {
        fetchDashboardData();
    }, [navigate]);

    // Function to fetch dashboard data (can be called to refresh)
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch user profile and incidents in parallel for better performance
            const [profileResponse, incidentsResponse] = await Promise.all([
                axiosInstance.get('/users/profile/'),
                axiosInstance.get('/incidents/')
            ]);

            setProfile(profileResponse.data);
            setIncidents(incidentsResponse.data);
            setError('');
            
            console.log('✅ Dashboard data loaded successfully');
            console.log('📊 Profile:', profileResponse.data);
            console.log('📋 Incidents:', incidentsResponse.data);
            
        } catch (err) {
            console.error('❌ Error loading dashboard data:', err);
            
            if (err.response?.status === 401) {
                setError('Please log in to access the dashboard.');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError('Failed to load dashboard data. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle incident updates (refresh data after edit/delete)
    const handleIncidentUpdate = () => {
        console.log('🔄 Refreshing incidents after update...');
        fetchDashboardData();
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your dashboard...</p>
                    <p className="text-gray-500 text-sm">Fetching incidents and statistics</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
                    <span className="text-red-500 text-4xl mb-4 block">⚠️</span>
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Dashboard Error</h2>
                    <p className="text-red-700 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Dashboard Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-4 shadow-lg">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🏠 Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Welcome back, {profile?.name || 'User'}! Here's your disaster management overview.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Dashboard Statistics */}
                <DashboardStats 
                    incidents={incidents}
                    userRole={profile?.role || 'citizen'}
                    currentUserId={profile?.id}
                />

                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Recent Incidents - Takes up 2 columns */}
                    <div className="lg:col-span-2">
                        <IncidentList 
                            incidents={incidents}
                            title="Recent Incidents"
                            maxItems={6}
                            currentUserId={profile?.id}
                            onIncidentUpdate={handleIncidentUpdate}
                        />
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="space-y-6">
                        <QuickActions userRole={profile?.role || 'citizen'} />
                        
                        {/* Emergency Contact Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold text-gray-800">Emergency Contacts</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Police:</span>
                                    <span className="font-semibold text-gray-900">100</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Fire Department:</span>
                                    <span className="font-semibold text-gray-900">101</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Ambulance:</span>
                                    <span className="font-semibold text-gray-900">108</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Disaster Helpline:</span>
                                    <span className="font-semibold text-gray-900">1078</span>
                                </div>
                            </div>
                        </div>

                        {/* Weather Alert Card (Placeholder) */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-center mb-3">
                                <span className="text-yellow-600 text-lg mr-2">🌤️</span>
                                <h3 className="text-lg font-semibold text-yellow-800">Weather Alert</h3>
                            </div>
                            <p className="text-yellow-700 text-sm">
                                Heavy rainfall expected in your area. Stay alert and avoid low-lying areas.
                            </p>
                            <button className="mt-3 text-yellow-800 text-xs font-medium hover:underline">
                                View Details →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Disaster Management System • Last updated: {new Date().toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
