// Path: dms-frontend/src/pages/GovernmentDashboard.jsx
// Government Dashboard for District Administration, Municipal Corporation
// Shows regional overview, resource allocation, and coordination tools

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import DashboardStats from '../components/dashboard/DashboardStats';
import IncidentList from '../components/dashboard/IncidentList';

const GovernmentDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [regionalStats, setRegionalStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGovernmentData = async () => {
            try {
                setLoading(true);
                
                const [profileResponse, incidentsResponse] = await Promise.all([
                    axiosInstance.get('/users/profile/'),
                    axiosInstance.get('/incidents/')
                ]);

                setProfile(profileResponse.data);
                setIncidents(incidentsResponse.data);
                
                // Calculate regional statistics
                const stats = calculateRegionalStats(incidentsResponse.data);
                setRegionalStats(stats);
                
                setError('');
            } catch (err) {
                console.error('❌ Error loading government data:', err);
                if (err.response?.status === 401) {
                    setError('Please log in to access the government dashboard.');
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setError('Failed to load government data. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGovernmentData();
    }, [navigate]);

    // Calculate regional statistics
    const calculateRegionalStats = (incidents) => {
        const locationStats = {};
        incidents.forEach(incident => {
            const location = incident.location || 'Unknown';
            if (!locationStats[location]) {
                locationStats[location] = { total: 0, high: 0, active: 0 };
            }
            locationStats[location].total++;
            if (incident.severity === 'high') locationStats[location].high++;
            if (incident.status !== 'resolved') locationStats[location].active++;
        });
        return locationStats;
    };

    // Government coordination actions
    const coordinationActions = [
        {
            title: 'Deploy NDRF Team',
            icon: '🚁',
            color: 'bg-red-600 hover:bg-red-700',
            description: 'National Disaster Response Force',
            onClick: () => alert('NDRF team deployment initiated! (Demo)')
        },
        {
            title: 'Allocate Resources',
            icon: '📦',
            color: 'bg-blue-600 hover:bg-blue-700',
            description: 'Emergency supplies & equipment',
            onClick: () => alert('Resource allocation approved! (Demo)')
        },
        {
            title: 'Mass Alert System',
            icon: '📢',
            color: 'bg-orange-600 hover:bg-orange-700',
            description: 'Send region-wide alerts',
            onClick: () => alert('Mass alert sent to region! (Demo)')
        },
        {
            title: 'Coordinate Agencies',
            icon: '🤝',
            color: 'bg-green-600 hover:bg-green-700',
            description: 'Inter-agency coordination',
            onClick: () => alert('Agencies coordinated! (Demo)')
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading government dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
                    <span className="text-red-500 text-4xl mb-4 block">⚠️</span>
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Government Dashboard Error</h2>
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Government Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full mb-4 shadow-lg">
                        <span className="text-2xl">🏛️</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Government Control Center
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Welcome, {profile?.name || 'Administrator'}! Regional disaster management overview.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Regional Overview Statistics */}
                <DashboardStats 
                    incidents={incidents}
                    userRole="admin"
                    currentUserId={profile?.id}
                />

                {/* Regional Statistics */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="flex items-center mb-6">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        <h2 className="text-xl font-semibold text-gray-800">Regional Incident Distribution</h2>
                    </div>
                    
                    {Object.keys(regionalStats).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(regionalStats).map(([location, stats]) => (
                                <div key={location} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h3 className="font-semibold text-gray-900 mb-2">📍 {location}</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total:</span>
                                            <span className="font-medium">{stats.total}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">High Priority:</span>
                                            <span className="font-medium text-red-600">{stats.high}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Active:</span>
                                            <span className="font-medium text-orange-600">{stats.active}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-gray-400 text-4xl mb-4">🗺️</div>
                            <p className="text-gray-500">No regional data available</p>
                        </div>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Incidents Overview - Takes up 2 columns */}
                    <div className="lg:col-span-2">
                        <IncidentList 
                            incidents={incidents}
                            title="🗺️ Regional Incident Overview"
                            maxItems={10}
                        />
                    </div>

                    {/* Government Actions Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Coordination Actions */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-6">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold text-gray-800">Coordination Center</h3>
                            </div>
                            <div className="space-y-3">
                                {coordinationActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.onClick}
                                        className={`w-full ${action.color} text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg text-left`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">{action.icon}</span>
                                            <div>
                                                <div className="font-semibold text-sm">{action.title}</div>
                                                <div className="text-xs opacity-90">{action.description}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Government Navigation */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold text-gray-800">Government Tools</h3>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/manage-incidents')}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    <span>📋</span>
                                    <span>Manage All Incidents</span>
                                </button>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    <span>📊</span>
                                    <span>General Dashboard</span>
                                </button>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    <span>👤</span>
                                    <span>Profile</span>
                                </button>
                            </div>
                        </div>

                        {/* Resource Allocation */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-center mb-3">
                                <span className="text-blue-600 text-lg mr-2">📦</span>
                                <h3 className="text-lg font-semibold text-blue-800">Resource Status</h3>
                            </div>
                            <div className="space-y-2 text-sm text-blue-700">
                                <div className="flex justify-between">
                                    <span>Emergency Vehicles:</span>
                                    <span className="font-medium">15 Available</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Medical Supplies:</span>
                                    <span className="font-medium">85% Stock</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>NDRF Teams:</span>
                                    <span className="font-medium">3 Standby</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shelter Capacity:</span>
                                    <span className="font-medium">2,500 People</span>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Protocols */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                            <div className="flex items-center mb-3">
                                <span className="text-orange-600 text-lg mr-2">📋</span>
                                <h3 className="text-lg font-semibold text-orange-800">Government Protocols</h3>
                            </div>
                            <div className="space-y-2 text-sm text-orange-700">
                                <p>• Monitor regional incident patterns</p>
                                <p>• Coordinate inter-agency response</p>
                                <p>• Allocate resources based on priority</p>
                                <p>• Communicate with state/national level</p>
                                <p>• Ensure public safety measures</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovernmentDashboard;
